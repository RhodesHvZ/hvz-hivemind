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
const SocketEventEnum = require('../../common/SocketEventEnum')
const Store = require('../common/Store')
const UserReducer = require('./UserReducer')

/**
 * User Manager
 * @class
 *
 * Maintain user state and handle user events
 */
class UserManager extends Store {

  /**
   * constructor
   */
  constructor(systemManager) {
    super()
    this.systemManager = systemManager
    //Events.on(Events.eventList.USER_AUTH, event => this.handleUserAuth(event))
    //Events.on(Events.eventList.USER_REGISTERED, event => this.handleUserReg(event))
  }

  /**
   * reducers
   */
  static get reducer () {
    return UserReducer
  }

  handleUserAuth (event) {
    console.log('USER MANAGER', event)
  }

  handleUserReg(event) {

  }

  registerUser(data, socketid) {
    let { Status } = SocketEventEnum
    if (this.state[data.username]) {
      SocketManager.sockets.to(socketid).emit(Status.Fail, 'Username already exists')
      return
    }
    // TODO: fire event and reduce
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserManager
