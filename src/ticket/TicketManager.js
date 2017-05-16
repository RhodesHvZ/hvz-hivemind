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

/**
 * Ticket Manager
 * @class
 */
class TicketManager {

  constructor (system) {
    this.system = system
    Events.on('TICKET_CREATE', event => this.handleTicketCreate(event))
  }

  handleTicketCreate(event) {
    let { socketManager } = this.system
    socketManager.getSocket(event.socket.id).emit('SYSTEM', 'Ticket created successfully')
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketManager
