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
 * InvalidRequest
 * @class
 */
class InvalidRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new InvalidRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.respond)
      .catch(instance.internalServerError)
  }

  respond (instance) {
    instance.invalidRequest()
  }
}

/**
 * Export
 * @ignore
 */
module.exports = InvalidRequest
