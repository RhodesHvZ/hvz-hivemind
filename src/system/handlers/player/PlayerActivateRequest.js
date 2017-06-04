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
 * PlayerActivateRequest
 * @class
 */
class PlayerActivateRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerActivateRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.authorization)
      .then(instance.getPlayer)
      .then(instance.activate)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'player_id'],
      authorization_level: GameAdminRankEnum.SUPER
    }
  }

  activate (instance) {
    let { socket: { handshake: { session: { sub: admin } } }, player } = instance
    let { log } = PlayerActivateRequest

    return player.activate({ admin })
      .then(() => {
        log.info({ id: player.id }, 'Player activated')
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
module.exports = PlayerActivateRequest
