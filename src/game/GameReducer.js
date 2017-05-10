use strict'

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
    console.log('Player activated')
  }

}

/**
 * Export
 * @ignore
 */
module.exports = PlayerReducer
