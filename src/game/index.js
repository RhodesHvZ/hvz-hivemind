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
const GameReducer = require('./GameReducer')
const PlayerManager = require('../player')

/**
 * Game Manager
 * @class
 */
class GameManager extends Store {

  /**
   * constructor
   */
  constructor (systemManager) {
    this.systemManager = systemManager
    this.playerManager = new PlayerManager(this)
    this.squadManager = new SquadManager(this)
    this.missionManager = new MissionManager(this)
  }

  /**
   * reducers
   */
  static get reducer () {
    return GameReducer
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameManager
