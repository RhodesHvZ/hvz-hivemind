'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Events = require('../events')
const SocketManager = require('../socket')

/**
 * Ticket Manager
 * @class
 */
class TicketManager {

  constructor() {
    Events.on('TICKET_CREATE', event => this.handleTicketCreate(event))
  }

  handleTicketCreate(event) {
    //TODO
    if (true) {
      SocketManager.Instance.to(event.socket.id).emit('SYSTEM', 'Ticket created successfully')
    }
  }
}

/**
 * Export
 * @ignore
 */
module.exports = new TicketManager()
