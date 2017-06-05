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
const BaseRequest = require('../BaseRequest')

/**
 * UpdateUserRequest
 * @class
 */
class UpdateUserRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new UpdateUserRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.authenticated)
      .then(instance.getSelf)
      .then(instance.update)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  update (instance) {
    let { request: { data }, socket: { handshake: { session } }, user } = instance

    instance.heartbeat(10)

    return user.update(data)
      .then(() => {
        instance.heartbeat(80)
        instance.response = user
        return user.updateSession(session)
      })
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UpdateUserRequest
