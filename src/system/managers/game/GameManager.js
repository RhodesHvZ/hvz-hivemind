'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Store = require('../../common/Store')
const Events = require('../../events')
const PlayerManager = require('../player')
const SquadManager = require('../squad')
const MissionManager = require('../mission')
const GameReducer = require('./GameReducer')

/**
 * Game Manager
 * @class
 */
class GameManager extends Store {

  /**
   * constructor
   */
  constructor(systemManager) {
    super()
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
