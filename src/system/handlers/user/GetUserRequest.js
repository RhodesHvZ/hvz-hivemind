'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const BaseRequest = require('../BaseRequest')

/**
 * GetUserRequest
 * @class
 */
class GetUserRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new GetUserRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.lookup)
      .then(instance.respond)
      .catch(error => instance.internalServerError(error))
  }

  lookup (instance) {
    let { request, system, constructor: { log } } = instance
    let { id } = request

    instance.heartbeat(25)
    instance.heartbeat(50)
    instance.heartbeat(75)

    return system.userManager.getUser(id)
      .then(user => instance.response = user)
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }

  respond (instance) {
    let { response } = instance
    instance.success(response)
    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GetUserRequest
