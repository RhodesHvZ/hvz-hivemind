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
const BaseRequest = require('../BaseRequest')

/**
 * NewGameRequest
 * @class
 */
class NewGameRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new NewGameRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.create)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get required_fields () {
    return ['name', 'registration_date', 'start_date', 'end_date']
  }

  create (instance) {
    let { log } = NewGameRequest
    let { request: { data }, socket, system } = instance
    let { gameManager } = system
    let { type: Game } = gameManager
    let { handshake: { session: { sub: id } } } = socket
    let { name, description, background_image, registration_date, start_date, end_date, rules } = data

    let game = {
      name,
      description,
      background_image,
      registration_date: moment(registration_date).valueOf(),
      start_date: moment(start_date).valueOf(),
      end_date: moment(end_date).valueOf(),
      rules,
      admins: [{ id, rank: 1 }]
    }

    log.debug({ game }, 'New Game')

    return gameManager.newGame(game)
      .then(game => {
        instance.response = game
        return instance
      })
      .catch(error => instance.forbiddenError(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = NewGameRequest
