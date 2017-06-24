'use strict'

/**
 * Dependencies
 * @ignore
 */
const moment = require('moment')

/**
 * Module Dependencies
 * @ignore
 */
const Logger = require('../../logger')
const Config = require('../../config')

/**
 * Log
 * @ignore
 */
const log = Logger.bootLogger

/**
 * BaseRequest
 * @class
 */
class BaseRequest {

  constructor (request, socket, system, error) {
    this.request = request
    this.socket = socket
    this.system = system

    if (error) {
      this.error = error
    }
  }

  static get log () {
    return log
  }

  static get meta () {
    throw new Error('meta must be overriden in BaseRequest child class')
  }

  authenticated (instance) {
    let { socket: { handshake: { session: { sub } } } } = instance

    if (!sub) {
      return instance.unauthorizedError()
    }

    // TODO more sophisticated authorization checking

    return instance
  }

  ensureRequestFields (instance) {
    let { request: { data }, constructor: { meta } } = instance
    let { request_fields } = meta

    if (!request_fields) {
      return instance.internalServerError('meta.request_fields must be provided from the child class of BaseRequest')
    }

    if (!data) {
      return instance.invalidRequest('data is required')
    }

    let error = {
      error: 'required fields missing',
      fields: []
    }

    request_fields.forEach(field => {
      if (!data[field]) {
        error.fields.push(field)
      }
    })

    if (error.fields.length > 0) {
      return instance.invalidRequest(error)
    }

    return instance
  }

  userExists (instance) {
    let { request: { data }, system: { userManager } } = instance
    let { user_id } = data

    return userManager.exists({ id: user_id }).then(result => {
      if (!result) {
        return instance.invalidRequest(`User id ${user_id} does not exist`)
      }
      return instance
    }).catch(error => Promise.reject(error))
  }

  getUser (instance) {
    let { request: { data }, system: { userManager } } = instance
    let { user_id } = data

    return userManager.get({ id: user_id, safe: true }).then(user => {
      instance.user = user
      return instance
    }).catch(error => Promise.reject(error))
  }

  getSelf (instance) {
    let { socket: { handshake: { session: { sub: id } } }, system: { userManager } } = instance

    return userManager.get({ id }).then(user => {
      instance.user = user
      return instance
    }).catch(error => Promise.reject(error))
  }

  internalServerError (err) {
    let { request, error, socket } = this
    let { type: request_type } = request

    if (err || error) {
      error = error || err || 'Internal Server Error'

      if (error instanceof Error) {
        let { message, fileName, lineNumber, stack } = error
        log.error({ message, fileName, lineNumber, stack }, 'Internal Server Error')
        socket.emit('message', { type: 'FAILURE', request_type, error: message })
      } else if (typeof error === 'string' || (typeof error === 'object' && Object.keys(error).length > 0)) {
        log.error({ error }, 'Internal Server Error')
        socket.emit('message', { type: 'FAILURE', request_type, error })
      }
    }

    return this
  }

  forbiddenError (err) {
    let { request, error, socket } = this
    let { type: request_type } = request
    log.warn(request, 'Forbidden request')
    socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Forbidden' })
    return Promise.reject()
  }

  unauthorizedError (err) {
    let { request, error, socket } = this
    let { type: request_type } = request
    log.warn(request, 'Unauthorized request')
    socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Unauthorized' })
    return Promise.reject()
  }

  invalidRequest (err) {
    let { request, error, socket } = this
    let { type: request_type } = request
    log.warn(request, 'Invalid request')
    socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Invalid Request' })
    return Promise.reject()
  }

  heartbeat (progress) {
    let { request, socket } = this
    let { type: request_type } = request
    socket.emit('message', { type: 'HEARTBEAT', request_type, timestamp: moment(), progress })
  }

  success (instance) {
    let { request, socket, response } = instance
    let { type: request_type } = request

    if (!response) {
      return Promise.reject('Response not present on handler')
    }

    log.debug({ response }, `Request end: success`)

    socket.emit('message', {
      timestamp: moment().valueOf(),
      progress: 100,
      type: 'SUCCESS',
      request_type,
      data: response
    })

    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = BaseRequest
