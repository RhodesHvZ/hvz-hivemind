'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Store = require('../common/Store')
const SystemReducer = require('./SystemReducer')

/**
 * Managers
 * @ignore
 */
const SocketManager = require('./SocketManager')
const GameManager = require('../game')
const UserManager = require('../user')

/**
 * Game Manager
 * @class
 */
class SystemManager extends Store {

  /**
   * constructor
   */
  constructor (server) {
    super()
    this.server = server
    this.socketManager = new SocketManager(this)
    this.gameManager = new GameManager(this)
    this.userManager = new UserManager(this)
  }

  /**
   * reducers
   */
  static get reducer () {
    return SystemReducer
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SystemManager
