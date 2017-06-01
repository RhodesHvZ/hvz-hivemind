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

  /**
   * constructor
   */
  constructor (manager, data, hidden) {
    super(manager, data, hidden)
    Object.defineProperty(this, 'playerManager', { value: new PlayerManager(manager.system, this) })
    Object.defineProperty(this, 'squadManager', { value: new SquadManager(manager.system, this) })
    Object.defineProperty(this, 'missionManager', { value: new MissionManager(manager.system, this) })
  }

  static get typeName () {
    return 'game'
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Game
