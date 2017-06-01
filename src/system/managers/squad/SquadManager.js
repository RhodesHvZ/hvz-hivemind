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
const Squad = require('./Squad')

/**
 * Squad Manager
 * @class
 */
class SquadManager extends Manager {

  /**
   * constructor
   */
  constructor (system, game) {
    super(system)
    this.game = game
  }

  static get type () {
    return Squad
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SquadManager
