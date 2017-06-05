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
 * UserGetMailRequest
 * @class
 */
class UserGetMailRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new UserGetMailRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.authenticated)
      .then(instance.getSelf)
      .then(instance.getMessages)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  getMessages (instance) {
    let { request: { data }, user: { mailManager } } = instance

    let page
    if (data) {
      let { page: p } = data
      page = p ? p : 0
    }

    instance.heartbeat(10)

    return mailManager.getMessages({ page })
      .then(mail => {
        instance.heartbeat(80)
        instance.response = mail
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserGetMailRequest
