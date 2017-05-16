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
  constructor (system) {
    super()
    this.system = system
    //Events.on(Events.eventList.USER_AUTH, event => this.handleUserAuth(event))
    Events.on(Events.eventList.USER_REGISTERED, event => this.dispatch())
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
    let { socketManager } = this.system
    let { Status } = SocketEventEnum
    let socket = socketManager.getSocket(socketid)

    if (this.state[data.username]) {
      socket.emit(Status.Fail, 'Username already exists')
      return
    } else {
      Events.USER_REGISTERED(Object.assign({}, {
        data: {
          firstname: data[firstname],
          lastname: data[lastname],
          email: data[email],
          userSettings: {},
          players: {},
          achievements: {}
        },
        type: 'USER_REGISTERED'
      }))
    }
    // TODO: fire event and reduce
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserManager
