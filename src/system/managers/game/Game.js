'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Type = require('../../common/Type')
const PlayerManager = require('../player')
const SquadManager = require('../squad')
const MissionManager = require('../mission')

/**
 * Game
 * @class
 */
class Game extends Type {

  static get typeName () {
    return 'game'
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Game
