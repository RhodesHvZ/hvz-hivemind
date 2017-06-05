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
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getUser)
      .then(instance.message)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['user_id', 'message']
    }
  }

  message (instance) {
    let { request, socket, user } = instance
    let { mailManager } = user
    let { handshake: { session: { sub } } } = socket
    let { data: { message } } = request

    instance.heartbeat(10)

    return mailManager.privateMessage({ message, sender: sub })
      .then(mail => {
        let { id: message_id } = mail
        instance.heartbeat(80)
        instance.response = { message_id, success: true, message }
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UpdateUserRequest
