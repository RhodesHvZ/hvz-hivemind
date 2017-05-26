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

  internalServerError (err) {
    let { request, error, socket } = this

    if (err || error) {
      return socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Internal Server Error' })
    }

    return this
  }

  invalidRequest (err) {
    let { request: { type: request_type }, error, socket } = this
    socket.emit('message', { type: 'FAILURE', request_type, error: error || err || 'Invalid Request' })
  }

  heartbeat (progress) {
    let { request, socket } = this
    let { type: request_type } = request
    socket.emit('message', { type: 'HEARTBEAT', request_type, timestamp: moment(), progress })
  }

  success (response) {
    let { request, socket } = this
    let { type: request_type } = request

    log.debug({ response }, `Request end: success`)

    socket.emit('message', {
      timestamp: moment(),
      progress: 100,
      type: 'SUCCESS',
      request_type,
      data: response
    })
  }
}

/**
 * Export
 * @ignore
 */
module.exports = BaseRequest
