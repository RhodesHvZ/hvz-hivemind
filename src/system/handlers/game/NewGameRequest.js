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
    let { request, socket, system } = instance
    let { gameManager } = system
    let { data: { name, description, background_image, registration_date, start_date, end_date, rules } } = request
    let { handshake: { session: { sub: id } } } = socket

    if (!name) {
      return Promise.reject('name is required to create a new game')
    }

    if (!registration_date) {
      return Promise.reject('registration_date is required to create a new game')
    }

    if (!start_date) {
      return Promise.reject('start_date is required to create a new game')
    }

    if (!end_date) {
      return Promise.reject('end_date is required to create a new game')
    }

    let game = {
      name,
      description,
      background_image,
      state: 'new',
      registration_date: moment(registration_date).valueOf(),
      start_date: moment(start_date).valueOf(),
      end_date: moment(end_date).valueOf(),
      rules,
      admins: [{ id, rank: 1000 }]
    }

    log.debug({ game }, 'New Game')
    instance.response = game

    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = NewGameRequest
