'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Reducer = require('../common/Reducer')

/**
 * PlayerReducer
 *
 * @class
 * Reduce new player state
 *
 * @todo
 */
class PlayerReducer extends Reducer {

  static get mapping () {
    return {
      'PLAYER_ACTIVATE': this.activate
    }
  }

  static activate (oldState, action) {
    // TODO
  }

}

/**
 * Export
 * @ignore
 */
module.exports = PlayerReducer
