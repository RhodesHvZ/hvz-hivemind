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
 * UpdateGamePermissionRequest
 * @class
 */
class UpdateGamePermissionRequest extends GameBaseRequest {

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

  static get meta () {
    return {
      request_fields: ['game_id', 'user_id'],
      authorization_level: GameAdminRankEnum.SUPER
    }
  }

  update (instance) {
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
