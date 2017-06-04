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
    return ['code', 'last_words', 'game_events', 'missions']
  }

  userUnique (id) {
    let { game } = this

    return this.search({
      query: {
        match: { user: id }
      }
    })
    .then(players => {
      return players.length === 0
    })
    .catch(error => Promise.reject(error))
  }

  generateCode () {
    return 'r4nd0m b1t3 c0d3'
  }
}

/**
 * Export
 * @ignore
 */
module.exports = PlayerManager
