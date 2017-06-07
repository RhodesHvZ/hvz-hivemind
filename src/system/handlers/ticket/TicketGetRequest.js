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
    let { request: { data: { ticket_id, query } } } = instance

    if (!ticket_id && !query) {
      return instance.invalidRequest('ticket_id or query must be present')
    }

    instance.heartbeat(10)

    if (query) {
      return instance.search(instance)
    } else {
      return instance.lookup(instance)
    }
  }

  search (instance) {
    let { request, system } = instance
    let { ticketManager } = system
    let { data: { query } } = request

    return ticketManager.search({
      query: {
        bool: {
          should: [
            { match: { subject: query } },
            { match: { state: query } },
            { term: { game_id: query } },
            {
              nested: {
                path: 'messages',
                query: {
                  match: { 'messages.message': query }
                }
              }
            }
          ]
        }
      }
    }).then(tickets => {
        instance.response = tickets
        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }

  lookup (instance) {
    let { request, system } = instance
    let { ticketManager } = system
    let { data: { ticket_id: id } } = request

    return ticketManager.get({ id, safe: true })
      .then(ticket => {
        instance.response = ticket
        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketGetRequest
