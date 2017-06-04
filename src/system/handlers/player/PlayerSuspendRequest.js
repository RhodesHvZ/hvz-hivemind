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
 * PlayerSuspendRequest
 * @class
 */
class PlayerSuspendRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerSuspendRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.authorization)
      .then(instance.getPlayer)
      .then(instance.suspend)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'player_id', 'until'],
      authorization_level: GameAdminRankEnum.SUPER
    }
  }

  suspend (instance) {
    let { request, socket: { handshake: { session: { sub: admin } } }, player } = instance
    let { log } = PlayerSuspendRequest
    let { data: { until, reason } } = request
    let { player_state, player_states } = player

    if (player_state !== player_states.ACTIVE) {
      return instance.invalidRequest('Can only suspend an active player')
    }

    let normalizedUntil = moment(until)
    if (!normalizedUntil.isValid()) {
      return Promise.reject('until is an invalid date')
    }
    until = normalizedUntil.valueOf()

    return player.suspend({ admin, until, reason })
      .then(() => {
        log.info({ id: player.id }, 'Player suspended')
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
module.exports = PlayerSuspendRequest
