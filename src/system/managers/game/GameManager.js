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
const Game = require('./Game')

/**
 * Game Manager
 * @class
 */
class GameManager extends Manager {

  /**
   * constructor
   */
  constructor(system) {
    super(system)
  }

  static get type () {
    return Game
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameManager
