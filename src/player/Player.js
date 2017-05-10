'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */

/**
 * Player
 * @class
 */
class Player {

  constructor (data, playerManager) {
    // Deconstruct player data
    // Temp
    this.playerManager = playerManager
    Object.assign(this, data)
  }

  kill (victimId) {
    this.playerManager.dispatch({
      type: 'PLAYER_KILL',
      victim: victimId
    })
  }
}

/**
 * Export
 * @ignore
 */
module.exports = Player
