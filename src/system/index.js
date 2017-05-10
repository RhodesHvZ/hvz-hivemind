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
const Events = require('../events')
const SocketManager = require('../socket')
const SystemReducer = require('./SystemReducer')
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
  constructor() {
    super()
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
