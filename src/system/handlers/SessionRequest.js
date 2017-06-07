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
 * SessionRequest
 * @class
 */
class SessionRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new SessionRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.session)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  session (instance) {
    let { socket: { handshake: { session } } } = instance
    let { sub: user_id, name, email, picture, sysadmin } = session

    instance.response = { user_id, name, email, picture, sysadmin }
    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SessionRequest
