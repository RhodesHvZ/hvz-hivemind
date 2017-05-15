'use static'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const GetUserRequest = require('./user/GetUserRequest')

/**
 * MessageDispatcher
 * @class
 */
class MessageDispatcher {

  static handle (request, socket, system) {
    // DEBUG
    return GetUserRequest.handle(request, socket, system)
    // Actually dispatch between requests here.
  }

}

/**
 * Export
 * @ignore
 */
module.exports = MessageDispatcher
