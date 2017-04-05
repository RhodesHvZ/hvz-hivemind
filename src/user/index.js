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
 * User Manager
 * @class
 *
 * @description
 * Maintain user state and handle user events
 */
class UserManager {

  constructor () {
    Events.on('USER_AUTH', event => this.handleUserAuth(event))
  }

  handleUserAuth (event) {
    console.log('USER MANAGER', event)
  }

}

/**
 * Export
 * @ignore
 */
module.exports = new UserManager()
