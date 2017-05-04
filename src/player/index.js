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
const PlayerReducer = require('./PlayerReducer')

/**
 * Player Manager
 * @class
 */
class PlayerManager extends Store {

  constructor (gameManager) {
    // let initialState = { ... }
    // super(initialState)
    this.gameManager = gameManager
  }

  /**
   * reducers
   */
  static get reducer () {
    return PlayerReducer
  }

  getPlayer (id) {
    return new Player(this.state[id])
  }

}

/**
 * Export
 * @ignore
 */
module.exports = PlayerManager
