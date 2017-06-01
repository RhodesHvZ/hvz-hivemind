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
    return ['admins']
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
    .then(() => new Game(this, body))
    .catch(error => Promise.reject(error))
  }

  /**
   * getGame
   *
   * @description
   *
   *
   * @param  {String}  id
   * @param  {Boolean} safe
   * @return {Promise<Game>}
   */
  getGame (id, safe=false) {
    return this.get({ id, safe })
      .then(response => Game.fromResponse(this, response))
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameManager
