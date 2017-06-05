'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const DatabaseConnector = require('../../db')
const Config = require('../../config')
const Logger = require('../../logger')

/**
 * Logger
 * @ignore
 */
const log = Logger.bootLogger

/**
 * Client
 * @ignore
 */
let client

/**
 * Manager
 * @class
 */
class Manager {

  /**
   * constructor
   */
  constructor (system) {
    this.system = system
  }

  /**
   * client
   *
   * @static
   *
   * @description
   * Get Elastic Search client
   *
   * @return {ElasticsearchClient}
   */
  static get client () {
    if (!client) {
      client = DatabaseConnector.connection()
    }
    return client
  }

  /**
   * log
   *
   * @description
   * Get manager logger
   *
   * @return {BunyanLogger}
   */
  static get log () {
    return log
  }

  /**
   * meta
   *
   * @description
   * Get all relevant database metadata for the manager.
   *
   * @return {Object} index, type
   */
  static get meta () {
    let { elasticsearch: { index } } = Config
    let { typeName: type } = this

    return { index, type }
  }

  /**
   * typeName
   *
   * @description
   * Convenience getter for typeName
   *
   * @return {String}
   */
  static get typeName () {
    return this.type.typeName
  }

  /**
   * type
   *
   * @description
   * Abstract method to get the database type for the manager
   *
   * @throws {Error} This must be overriden in the child class
   *
   * @example
   * static get type () {
   *   return TypeClass
   * }
   *
   * class TypeClass extends Type {
   *   static get typeName () {
   *     return 'typeName'
   *   }
   * }
   */
  static get type () {
    throw new Error('type must be overriden in Manager child class')
  }

  /**
   * unsafeFields
   *
   * @description
   * Abstract method to provide a list of fields for a type that are not safe
   * for general consumption.
   *
   * @throws {Error} This must be overriden in the child class
   *
   * @example
   * static get unsafeFields () {
   *   return ['sensitiveFieldName1', 'sensitiveFieldName2']
   * }
   *
   * @return {Array}
   */
  static get unsafeFields () {
    throw new Error('unsafeFields must be overriden in Manager child class')
  }

  /**
   * exists
   *
   * @description
   * Document exists in the database
   *
   * @param  {...Object} data
   * @return {Promise<Boolean>}
   */
  exists (...data) {
    let mergedData = Object.assign({}, ...data)
    let { id } = mergedData

    if (!id) {
      return Promise.reject('Id is required to test existence')
    }

    let { constructor: { client, meta: { index, type } } } = this

    return client.exists({ index, type, id })
      .catch(error => Promise.reject(error))
  }

  /**
   * store
   *
   * @description
   * Store a document in the database
   *
   * @param  {...Object} data
   * @return {Promise<Response>}
   */
  store (...data) {
    let mergedData = Object.assign({}, ...data)
    let { id, body } = mergedData

    if (!body) {
      return Promise.reject('Data is required for store')
    }

    let { constructor: { client, meta: { index, type } } } = this

    if (!id) {
      return client.index({
        index,
        type,
        body
      }).catch(error => Promise.reject(error))

    } else {
      return client.index({
        index,
        type,
        id,
        body
      }).catch(error => Promise.reject(error))
    }
  }

  /**
   * update
   *
   * @description
   * Partially update an existing document in the database
   *
   * @param  {...Object} data
   * @return {Promise<Response>}
   */
  update (...data) {
    let mergedData = Object.assign({}, ...data)
    let { id, doc } = mergedData

    if (!id) {
      return Promise.reject('Id is required for update')
    }

    if (!doc) {
      return Promise.reject('Data is required for update')
    }

    let { constructor: { client, meta: { index, type } } } = this

    return client.update({
      index,
      type,
      id,
      body: { doc }
    }).catch(error => Promise.reject(error))
  }

  /**
   * delete
   *
   * @description
   * Delete a document from the database
   *
   * @param  {...Object} data
   * @return {Promise<Response>}
   */
  delete (...data) {
    let mergedData = Object.assign({}, ...data)
    let { id } = mergedData

    if (!id) {
      return Promise.reject('Id is required for delete')
    }

    let { constructor: { client, meta: { index, type } } } = this

    return client.delete({
      index,
      type,
      id
    }).catch(error => Promise.reject(error))
  }

  /**
   * get
   *
   * @description
   * Get a document from the database
   *
   * @param  {...Object} data
   * @return {Promise<Response>}
   */
  get (...data) {
    let mergedData = Object.assign({}, ...data)
    let { id, include, safe=false } = mergedData

    if (!id) {
      return Promise.reject('Id is required for get')
    }

    if (Array.isArray(id)) {
      return this.mget(mergedData).catch(error => Promise.reject(error))
    }

    let { constructor: { client, unsafeFields, type: Type, meta: { index, type } } } = this

    return client.get({
      index,
      type,
      id,
      _sourceExclude: safe ? [] : unsafeFields,
      _sourceInclude: include
    }).then(response => Type.fromResponse(this, response))
    .catch(error => {
      log.error(error, 'get failed')
      Promise.reject(error)
    })
  }

  /**
   * mget
   *
   * @description
   * Get multiple users by id
   *
   * @param  {...Object} data
   * @return {Array<User>}
   */
  mget (...data) {
    let mergedData = Object.assign({}, ...data)
    let { id: ids, include, safe=false } = mergedData

    if (!ids) {
      return Promise.reject('Id is required for get')
    }

    let { constructor: { client, unsafeFields, type: Type, meta: { index, type } } } = this

    return client.mget({
      index,
      type,
      body: { ids },
      _sourceExclude: safe ? [] : unsafeFields,
      _sourceInclude: include
    }).then(response => Type.fromResponse(this, response))
    .catch(error => {
      log.error(error, 'mget failed')
      Promise.reject(error)
    })
  }

  /**
   * search
   *
   * @description
   * Search for documents in the database
   *
   * @param  {...Object} data
   * @return {Promise<Response>}
   */
  search (...data) {
    let mergedData = Object.assign({}, ...data)
    let { query, include, sort, safe=false, size, from } = mergedData

    if (!query) {
      return Promise.reject('Query is required for search')
    }

    let { constructor: { client, unsafeFields, type: Type, meta: { index, type } } } = this

    return client.search({
      index,
      type,
      body: { query, sort },
      _sourceExclude: safe ? [] : unsafeFields,
      _sourceInclude: include,
      size,
      from
    }).then(response => Type.fromResponse(this, response))
    .catch(error => {
      log.error(error, 'search failed')
      Promise.reject(error)
    })
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Manager
