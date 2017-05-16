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
const PlayerReducer = require('./PlayerReducer')

/**
 * Player Manager
 * @class
 */
class PlayerManager extends Store {

  constructor (gameManager) {
     let initialState = {}
    super(initialState)
    this.gameManager = gameManager
    Events.on(Events.PLAYER_ACTIVATE, event => this.handlePlayerActivate(event))
  }
  /**
   * Event handlers
   *
   */
  handlePlayerActivate (event) {
    // Dispatch the event to trigger the reducer and update the game state
    console.log('handlePlayerActivate')
    this.dispatch(event)
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
