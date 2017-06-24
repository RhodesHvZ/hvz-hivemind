'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * TicketRequestsReducer
 * @class
 */
class TicketRequestsReducer {

  static get typeNames () {
    return [
      'SUCCESS_TICKET_GET',
      'SUCCESS_TICKET_NEW',
      'SUCCESS_TICKET_REPLY',
    ]
  }

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    if (this.typeNames.includes(type)) {
      return this.updateTickets(state, data)
    }

    return state
  }

  static updateTickets (state, data) {
    if (Array.isArray(data) && data.length > 0) {
      let updated = data.reduce((acc, ticket) => {
        let { id } = ticket
        acc[id] = Object.assign(this.updateTicket(state[id], ticket))
        return acc
      }, {})

      return Object.assign({}, state, updated)

    } else if (typeof data === 'object') {
      let { id } = data
      return Object.assign({}, state, { [id]: this.updateTicket(state[id], data) })
    }

    return state
  }

  static updateTicket (existing, data) {
    if (data) {
      return existing ? Object.assign({}, existing, data) : data
    }

    return existing || {}
  }
}

/**
 * Export
 * @ignore
 */
export default TicketRequestsReducer
