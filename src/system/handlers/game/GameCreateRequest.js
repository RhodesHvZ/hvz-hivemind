'use strict'

/**
 * Dependencies
 * @ignore
 */
const moment = require('moment')

/**
 * Module Dependencies
 * @ignore
 */
const GameBaseRequest = require('./GameBaseRequest')

/**
 * GameCreateRequest
 * @class
 */
class GameCreateRequest extends GameBaseRequest {

  static handle (request, socket, system) {
    let instance = new GameCreateRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.create)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      required_fields: ['name', 'registration_date', 'start_date', 'end_date']
    }
  }

  create (instance) {
    let { log } = GameCreateRequest
    let { request: { data }, socket, system } = instance
    let { gameManager } = system
    let { type: Game } = gameManager
    let { handshake: { session: { sub: user_id } } } = socket
    let { name, description, background_image, registration_date, start_date, end_date, rules } = data

    let game = {
      name,
      description,
      background_image,
      registration_date: moment(registration_date).valueOf(),
      start_date: moment(start_date).valueOf(),
      end_date: moment(end_date).valueOf(),
      rules,
      admins: [{ user_id, rank: 1 }]
    }

    log.debug({ game }, 'New Game')

    return gameManager.newGame(game)
      .then(game => {
        instance.response = game
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameCreateRequest
