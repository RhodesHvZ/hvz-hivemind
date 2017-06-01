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
const Achievement = require('./Achievement')

/**
 * Achievement Manager
 * @class
 */
class AchievementManager extends Manager {

  /**
   * constructor
   */
  constructor(system) {
    super(system)
  }

  static get type () {
    return Achievement
  }

  static get unsafeFields () {
    return []
  }
}

/**
 * Export
 * @ignore
 */
module.exports = AchievementManager
