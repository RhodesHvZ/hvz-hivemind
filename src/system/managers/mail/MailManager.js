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
const Mail = require('./Mail')

/**
 * Mail Manager
 * @class
 */
class MailManager extends Manager {

  /**
   * constructor
   */
  constructor (system, user) {
    super(system)
    this.user = user
  }

  static get type () {
    return Mail
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = MailManager
