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
const GameAdminRankEnum = require('../../managers/game/GameAdminRankEnum')

/**
 * UpdateGameRequest
 * @class
 */
class UpdateGameRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new UpdateGameRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.authorization)
      .then(instance.update)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get required_fields () {
    return ['id']
  }

  getGame (instance) {
    let { request: { data: { id } }, system } = instance
    let { gameManager } = system

    return gameManager.getGame(id, true).then(game => {
      instance.game = game
      return instance
    }).catch(error => Promise.reject(error))
  }

  authorization (instance) {
    let { log } = UpdateGameRequest
    let { request, socket, game: { admins } } = instance
    let { handshake: { session } } = socket
    let { sub: id } = session

    let [admin] = admins.filter(admin => admin.id === id)

    if (!admin || admin.rank > GameAdminRankEnum.SUPER) {
      return instance.unauthorizedError('Insufficient privilege')
    }

    return instance
  }

  update (instance) {
    let { log } = UpdateGameRequest
    let { request: { data }, game } = instance

    return game.update(data).then(() => {
      instance.response = game
      return instance
    }).catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UpdateGameRequest
