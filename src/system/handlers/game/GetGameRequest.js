'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const BaseRequest = require('../BaseRequest')

/**
 * GetGameRequest
 * @class
 */
class GetGameRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new GetGameRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get request_fields () {
    return []
  }

  dispatch (instance) {
    let { request: { data } } = instance
    let { id } = data

    instance.heartbeat(10)

    if (!id) {
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
      })
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }

  lookup (instance) {
    let { request, system } = instance
    let { gameManager } = system
    let { data: { id } } = request

    return gameManager.get({ id, safe: true })
      .then(game => {
        instance.response = game
        instance.heartbeat(80)
      })
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GetGameRequest
