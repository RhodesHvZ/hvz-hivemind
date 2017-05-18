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
      .catch(instance.internalServerError)
  }

  lookup (instance) {
    let { request } = instance
    instance.response = { data: 'scumscumscum' }
    instance.heartbeat(25)
    instance.heartbeat(50)
    instance.heartbeat(75)

    // Do something

    return instance
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
