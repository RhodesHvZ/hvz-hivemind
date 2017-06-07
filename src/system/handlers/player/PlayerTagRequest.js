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
      .then(instance.validateGameState)
      .then(instance.getPlayerByUser)
      .then(instance.playerActive)
      .then(instance.getPlayerByCode)
      .then(instance.victimActive)
      .then(instance.tag)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'code', 'lat', 'lon'],
      game_state: Game.states.RUNNING
    }
  }

  tag (instance) {
    let { request: { data: { lat, lon } }, player, victim } = instance
    let game_states = player.game_states

    if (player.id === victim.id) {
      return instance.invalidRequest('You cannot tag yourself')
    }

    if (player.game_state !== game_states.ZOMBIE) {
      return instance.invalidRequest('Only zombies can tag others')
    }

    if (victim.game_state !== game_state.HUMAN) {
      return instance.invalidRequest('Zombies don\'t taste as good as humans do...')
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
