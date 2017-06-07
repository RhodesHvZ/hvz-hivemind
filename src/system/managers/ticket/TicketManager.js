'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Events = require('../../events')
const Manager = require('../../common/Manager')
const Ticket = require('./Ticket')

/**
 * Ticket Manager
 * @class
 */
class TicketManager extends Manager {

  /**
   * constructor
   */
  constructor(system) {
    super(system)
  }

  static get type () {
    return Ticket
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TicketManager
