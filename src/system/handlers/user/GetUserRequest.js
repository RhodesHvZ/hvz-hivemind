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
    instance.response = { data: 'scumscumscum', request }

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
