'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Events = require('../../events')
const Manager = require('../../common/Manager')
const Player = require('./Player')

/**
 * Player Manager
 * @class
 */
class PlayerManager extends Manager {

  /**
   * constructor
   */
  constructor (system, game) {
    super(system)
    this.game = game
  }

  static get type () {
    return Player
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = PlayerManager
