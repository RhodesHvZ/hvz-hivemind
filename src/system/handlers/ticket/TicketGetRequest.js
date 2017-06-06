'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const TicketBaseRequest = require('./TicketBaseRequest')

/**
 * TicketGetRequest
 * @class
 */
class TicketGetRequest extends TicketBaseRequest {

  static handle (request, socket, system) {
    let instance = new TicketGetRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: []
    }
  }

  dispatch (instance) {
    let { request: { data } } = instance
    let { ticket_id } = data

    instance.heartbeat(10)

    if (!ticket_id) {
      return instance.search(instance)
    } else {
      return instance.lookup(instance)
    }
  }

  search (instance) {
    return instance
  }

  lookup (instance) {
    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketGetRequest
