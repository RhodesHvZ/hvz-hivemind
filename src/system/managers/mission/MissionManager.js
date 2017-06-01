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
const Mission = require('./Mission')

/**
 * Mission Manager
 * @class
 */
class MissionManager extends Manager {

  /**
   * constructor
   */
  constructor (system, game) {
    super(system)
    this.game = game
  }

  static get type () {
    return Mission
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = MissionManager
