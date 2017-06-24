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

  /**
   * newGame
   *
   * @description
   *
   *
   * @param  {Object} body
   * @return {Promise<Game>}
   */
  newGame (body) {
    let { name: id } = body
    let { log } = GameManager

    return this.exists({ id }).then(exists => {
      if (exists) {
        return Promise.reject(`Game ${id} already exists`)
      }
    })
    .then(() => this.store({ id, body }))
    .then(() => {
      body.id = id
      return new Game(this, body)
    })
    .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameManager
