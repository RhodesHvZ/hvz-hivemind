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
      .then(instance.authenticated)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  dispatch (instance) {
    let { request: { data } } = instance

    if (!data) {
      return instance.invalidRequest('data must be present')
    }

    let { id } = data

    if (!id) {
      return instance.invalidRequest('id must be present')
    }

    instance.heartbeat(10)
    return instance.lookup(instance)
  }

  lookup (instance) {
    let { request, system } = instance
    let { gameManager } = system
    let { data: { id } } = request

    return gameManager.getGame(id, true)
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
