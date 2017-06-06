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
const TicketBaseRequest = require('./TicketBaseRequest')

/**
 * TicketReplyRequest
 * @class
 */
class TicketReplyRequest extends TicketBaseRequest {

  static handle (request, socket, system) {
    let instance = new TicketReplyRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.reply)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['ticket_id', 'message']
    }
  }

  reply (instance) {
    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketReplyRequest
