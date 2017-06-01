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
      .then(instance.update)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  update (instance) {
    let { request, socket, system } = instance
    let { userManager } = system
    let { handshake: { session: { sub } } } = socket
    let { data: { name, email, picture } } = request

    instance.heartbeat(10)
    let data = { name, email, picture }

    return userManager.updateUser(sub, data).then(() => {
      instance.heartbeat(80)

      socket.handshake.session.name = data.name || socket.handshake.session.name
      socket.handshake.session.email = data.email || socket.handshake.session.email
      socket.handshake.session.picture = data.picture || socket.handshake.session.picture
      socket.handshake.session.save()

      instance.response = data
      return instance
    }).catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UpdateUserRequest
