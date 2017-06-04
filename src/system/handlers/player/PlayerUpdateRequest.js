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
 * PlayerUpdateRequest
 * @class
 */
class PlayerUpdateRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerUpdateRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.getPlayerByUser)
      .then(instance.update)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id']
    }
  }

  update (instance) {
    let { request: { data }, player } = instance
    let { log } = PlayerUpdateRequest

    return player.update(data)
      .then(() => {
        log.info({ id: player.id }, 'Player updated')
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
module.exports = PlayerUpdateRequest
