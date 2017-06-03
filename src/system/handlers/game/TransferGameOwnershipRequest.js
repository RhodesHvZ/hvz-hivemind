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
 * TransferGameOwnershipRequest
 * @class
 */
class TransferGameOwnershipRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new TransferGameOwnershipRequest(request, socket, system)

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
    let { request: { data: { game_id } }, system } = instance
    let { gameManager } = system

    return gameManager.get({ id: game_id, safe: true }).then(game => {
      instance.game = game
      return instance
    }).catch(error => Promise.reject(error))
  }

  authorization (instance) {
    let { socket, game: { admins } } = instance
    let { handshake: { session } } = socket
    let { sub: id } = session

    let [admin] = admins.filter(admin => admin.id === id)

    if (!admin || admin.rank > GameAdminRankEnum.OWNER) {
      return instance.unauthorizedError('Insufficient privilege')
    }

    return instance
  }

  userExists (instance) {
    return instance
  }

  update (instance) {
    let { request: { data }, socket, game } = instance
    let { user_id } = data
    let { handshake: { session: { sub: id } } } = socket

    if (user_id === id) {
      return instance.invalidRequest('Cannot transfer ownership to yourself')
    }

    return game.transferOwnership(data).then(() => {
      instance.response = game
      return instance
    }).catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = TransferGameOwnershipRequest
