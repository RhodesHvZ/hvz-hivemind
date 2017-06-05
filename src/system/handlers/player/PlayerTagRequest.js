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
 * PlayerTagRequest
 * @class
 */
class PlayerTagRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerTagRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.getPlayerByUser)
      .then(instance.getPlayerByCode)
      .then(instance.tag)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'code', 'lat', 'lon']
    }
  }

  tag (instance) {
    let { request: { data: { lat, lon } }, player, victim } = instance

    if (player.id === victim.id) {
      return instance.invalidRequest('You cannot tag yourself')
    }

    return player.tag({ victim, lat, lon })
      .then(response => {
        instance.response = response
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = PlayerTagRequest
