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
 * TicketCreateRequest
 * @class
 */
class TicketCreateRequest extends TicketBaseRequest {

  static handle (request, socket, system) {
    let instance = new TicketCreateRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.create)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['subject', 'message']
    }
  }

  create (instance) {
    let { log } = TicketCreateRequest
    let { request: { data }, socket, system } = instance
    let { ticketManager, userManager } = system
    let { handshake: { session: { sub: user_id } } } = socket
    let { game_id, subject, message } = data
    let timestamp = moment().valueOf()

    let body = {
      game_id,
      user_id,
      subject,
      timestamp,
      state: 'New',
      participants: [user_id],
      messages: [{ timestamp, message, user_id }],
    }

    log.debug({ ticket: body }, 'New Ticket')

    return ticketManager.store({ body })
      .then(ticket => {
        let mail_body = {
          user_id,
          timestamp,
          type: 'NEW_TICKET',
          data: { ticket_id: ticket.id, subject }
        }

        instance.response = ticket
        return userManager.mailSysAdmins(mail_body)
      })
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketCreateRequest
