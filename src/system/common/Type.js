'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Logger = require('../../logger')

/**
 * Log
 * @ignore
 */
const log = Logger.bootLogger

/**
 * Type
 * @class
 */
class Type {

  /**
   * constructor
   *
   * @param  {Manager} manager
   * @param  {Object} data - Object data
   * @param  {Object} hidden - Hidden attributes
   */
  constructor (manager, data, hidden) {
    Object.defineProperty(this, 'manager', { value: manager })
    Object.assign(this, data)

    Object.keys(hidden).forEach(key => {
      Object.defineProperty(this, key, { value: hidden[key], configurable: true })
    })

    log.debug(this, 'Type data constructor')
  }

  /**
   * log
   *
   * @description
   * Get Type Bunyan Logger
   *
   * @return {BunyanLogger}
   */
  static get log () {
    return log
  }

  /**
   * fromResponse
   *
   * @description
   * Parse a database response into objects
   *
   * @param  {Manager} manager
   * @param  {Object|Array} response]
   * @return {Object|Array}
   */
  static fromResponse (manager, response) {
    if (!response || typeof response !== 'object') {
      return Promise.reject('Data invalid')
    }

    if (Array.isArray(response)) {
      let { hits: { hits } } = response
      return hits.map(entry => this.fromResponse(manager, entry))
    }

    let ExtendedType = this
    let { _id: id, _source: source, _score, _type, _index } = response
    source.id = id

    return new ExtendedType(manager, source, { _id: id, _score, _type, _index })
  }

  /**
   * typeName
   *
   * @description
   * Get type name for database for database manager
   *
   * @example
   * static get typeName () {
   *   return 'typeName'
   * }
   *
   * @return {String}
   */
  static get typeName () {
    throw new Error('This must be overriden in child class')
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Type
