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
const Game = require('../../managers/game/Game')

/**
 * PlayerReviveRequest
 * @class
 */
class PlayerReviveRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerReviveRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.validateGameState)
      .then(instance.authorization)
      .then(instance.getPlayer)
      .then(instance.revive)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'player_id'],
      authorization_level: GameAdminRankEnum.SUPER,
      game_state: Game.states.RUNNING
    }
  }

  revive (instance) {
    let { request, socket: { handshake: { session: { sub: admin } } }, player } = instance
    let { log } = PlayerReviveRequest
    let { data: { reason } } = request

    return player.revive({ admin, reason })
      .then(() => {
        log.info({ id: player.id }, 'Player revived')
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
module.exports = PlayerReviveRequest
