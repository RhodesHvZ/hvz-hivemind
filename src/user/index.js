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
 * User Manager
 * @class
 *
 * Maintain user state and handle user events
 */
class UserManager {

  constructor () {
    Events.on('USER_AUTH', event => this.handleUserAuth(event))
    Events.on('USER_REGISTERED', event => this.handleUserReg(event))
  }

  handleUserAuth (event) {
    console.log('USER MANAGER', event)
  }
  
  handleUserReg(event) {
    SocketManager.Instance.send(event)
  }
}

/**
 * Export
 * @ignore
 */
module.exports = new UserManager()
