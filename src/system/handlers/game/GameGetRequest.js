'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const GameBaseRequest = require('./GameBaseRequest')

/**
 * GameGetRequest
 * @class
 */
class GameGetRequest extends GameBaseRequest {

  static handle (request, socket, system) {
    let instance = new GameGetRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: []
    }
  }

  dispatch (instance) {
    let { request: { data } } = instance
    let { game_id } = data

    instance.heartbeat(10)

    if (!game_id) {
      return instance.search(instance)
    } else {
      return instance.lookup(instance)
    }
  }

  search (instance) {
    let { request, system } = instance
    let { gameManager } = system

    return gameManager.search({ query: { match_all: {} } })
      .then(games => {
        instance.response = games
        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }

  lookup (instance) {
    let { request, system } = instance
    let { gameManager } = system
    let { data: { game_id: id } } = request

    return gameManager.get({ id })
      .then(game => {
        instance.response = game
        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameGetRequest
