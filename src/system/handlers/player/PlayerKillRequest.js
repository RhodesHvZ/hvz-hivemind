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
 * PlayerKillRequest
 * @class
 */
class PlayerKillRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerKillRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.validateGameState)
      .then(instance.authorization)
      .then(instance.getPlayer)
      .then(instance.kill)
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

  kill (instance) {
    let { request, socket: { handshake: { session: { sub: admin } } }, player } = instance
    let { log } = PlayerKillRequest
    let { data: { reason } } = request

    return player.kill({ admin, reason })
      .then(() => {
        log.info({ id: player.id }, 'Player killed')
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
module.exports = PlayerKillRequest
