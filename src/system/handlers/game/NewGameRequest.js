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
      .then(instance.authenticated)
      .then(instance.create)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  create (instance) {
    let { log } = NewGameRequest
    let { request: { data }, socket, system } = instance
    let { gameManager } = system
    let { type: Game } = gameManager
    let { handshake: { session: { sub: id } } } = socket

    if (!data) {
      return instance.invalidRequest('data is required to create a new game')
    }

    let { name, description, background_image, registration_date, start_date, end_date, rules } = data

    if (!name) {
      return instance.invalidRequest('name is required to create a new game')
    }

    if (!registration_date) {
      return instance.invalidRequest('registration_date is required to create a new game')
    }

    if (!start_date) {
      return instance.invalidRequest('start_date is required to create a new game')
    }

    if (!end_date) {
      return instance.invalidRequest('end_date is required to create a new game')
    }

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
