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
 * TicketBaseRequest
 * @class
 */
class TicketBaseRequest extends BaseRequest {

  getTicket (instance) {
    let { request: { data: { ticket_id } }, system } = instance
    let { ticketManager } = system

    return ticketManager.get({ id: ticket_id, safe: true }).then(ticket => {
      instance.ticket = ticket
      return instance
    }).catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketBaseRequest
