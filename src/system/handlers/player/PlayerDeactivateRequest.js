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
const PlayerBaseRequest = require('./PlayerBaseRequest')
const GameAdminRankEnum = require('../../managers/game/GameAdminRankEnum')

/**
 * PlayerDeactivateRequest
 * @class
 */
class PlayerDeactivateRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerDeactivateRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.authorization)
      .then(instance.getPlayer)
      .then(instance.deactivate)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'player_id'],
      authorization_level: GameAdminRankEnum.SUPER
    }
  }

  deactivate (instance) {
    let { socket: { handshake: { session: { sub: admin } } }, player } = instance
    let { log } = PlayerDeactivateRequest

    return player.deactivate({ admin })
      .then(() => {
        log.info({ id: player.id }, 'Player deactivated')
        instance.response = player
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = PlayerDeactivateRequest
