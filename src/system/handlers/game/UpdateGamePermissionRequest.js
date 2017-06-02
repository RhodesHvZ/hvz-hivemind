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
 * UpdateGamePermissionRequest
 * @class
 */
class UpdateGamePermissionRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new UpdateGamePermissionRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.authorization)
      .then(instance.userExists)
      .then(instance.update)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get request_fields () {
    return ['game_id', 'user_id']
  }

  getGame (instance) {
    let { request: { data: { game_id, rank, revoke } }, system } = instance
    let { gameManager } = system

    if (!rank && !revoke) {
      return instance.invalidRequest('either rank or revoke is required')
    }

    return gameManager.getGame(game_id, true).then(game => {
      instance.game = game
      return instance
    }).catch(error => Promise.reject(error))
  }

  authorization (instance) {
    let { log } = UpdateGamePermissionRequest
    let { socket, game: { admins } } = instance
    let { handshake: { session } } = socket
    let { sub: id } = session

    let [admin] = admins.filter(admin => admin.id === id)

    if (!admin || admin.rank > GameAdminRankEnum.SUPER) {
      return instance.unauthorizedError('Insufficient privilege')
    }

    return instance
  }

  userExists (instance) {
    return instance
  }

  update (instance) {
    let { log } = UpdateGamePermissionRequest
    let { request: { data }, game } = instance

    return game.updateAdmin(data).then(() => {
      instance.response = game
      return instance
    }).catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UpdateGamePermissionRequest
