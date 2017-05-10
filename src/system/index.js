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
const PlayerManager = require('../player')

/**
 * Game Manager
 * @class
 */
class SystemManager extends Store {

  /**
   * constructor
   */
  constructor () {
    this.gameManager = new gameManager(this)
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
