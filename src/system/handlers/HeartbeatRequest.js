'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const BaseRequest = require('./BaseRequest')

/**
 * HeartbeatRequest
 * @class
 */
class HeartbeatRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new HeartbeatRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.respond)
      .catch(error => instance.internalServerError(error))
  }

  respond (instance) {
    instance.heartbeat()
  }
}

/**
 * Export
 * @ignore
 */
module.exports = HeartbeatRequest
