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
const GameAdminRankEnum = require('../../managers/game/GameAdminRankEnum')

/**
 * TransferGameOwnershipRequest
 * @class
 */
class TransferGameOwnershipRequest extends GameBaseRequest {

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

  static get authorization_level () {
    return GameAdminRankEnum.OWNER
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
