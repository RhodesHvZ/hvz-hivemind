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

  authenticated (instance) {
    let { socket: { handshake: { session: { sub } } } } = instance

    if (!sub) {
      return Promise.reject('Unauthorized')
    }

    // TODO more sophisticated authorization checking

    return instance
  }

  internalServerError (err) {
    let { request: { type: request_type }, error, socket } = this

    if (err || error) {
      error = error || err || 'Internal Server Error'
      log.error({ error }, 'Internal Server Error')
      socket.emit('message', { type: 'FAILURE', request_type, error })
    }

    return this
  }

  forbiddenError (err) {
    let { request: { type: request_type }, error, socket } = this
    log.warn(request, 'Forbidden request')
    socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Forbidden' })
    return Promise.reject()
  }

  unauthorizedError (err) {
    let { request: { type: request_type }, error, socket } = this
    log.warn(request, 'Unauthorized request')
    socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Unauthorized' })
    return Promise.reject()
  }

  invalidRequest (err) {
    let { request: { type: request_type }, error, socket } = this
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
      timestamp: moment(),
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
