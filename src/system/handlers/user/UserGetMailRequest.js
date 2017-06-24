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

    let page, sent
    if (data) {
      let { page: p, sent: s } = data
      page = p ? p : 0
      sent = !!s
    }

    instance.heartbeat(10)

    return (sent
      ? mailManager.getSentMessages({ page })
      : mailManager.getMessages({ page }))
        .then(mail => {
          console.log('mail', mail)
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
