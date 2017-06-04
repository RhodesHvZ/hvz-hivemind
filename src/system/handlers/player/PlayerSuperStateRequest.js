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
 * PlayerSuperStateRequest
 * @class
 */
class PlayerSuperStateRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerSuperStateRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.authorization)
      .then(instance.getPlayer)
      .then(instance.superState)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'player_id', 'super_state'],
      authorization_level: GameAdminRankEnum.SUPER
    }
  }

  superState (instance) {
    let { request, socket: { handshake: { session: { sub: admin } } }, player } = instance
    let { data: { super_state, remove } } = request
    let { log } = PlayerSuperStateRequest

    let promise
    if (remove) {
      promise = player.removeSuperState({ admin, super_state })
    } else {
      promise = player.addSuperState({ admin, super_state })
    }

    return promise
      .then(() => {
        log.info({ id: player.id, super_state, remove }, 'Player super state')
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
module.exports = PlayerSuperStateRequest
