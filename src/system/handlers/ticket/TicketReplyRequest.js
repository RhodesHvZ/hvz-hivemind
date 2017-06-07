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
      .then(instance.getTicket)
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
    let { request: { data }, socket, ticket } = instance
    let { handshake: { session: { sub: user_id } } } = socket
    let { state } = ticket
    let { message, state: new_state } = data

    if (state === 'Closed') {
      return instance.invalidRequest('Ticket is closed. No further replies are possible.')
    }

    return ticket.reply({ user_id, message, state: new_state })
      .then(() => {
        instance.heartbeat(80)
        instance.response = ticket
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketReplyRequest
