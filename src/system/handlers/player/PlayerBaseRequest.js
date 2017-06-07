'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const GameBaseRequest = require('../game/GameBaseRequest')

/**
 * Check player active
 */
const isActive = player => {
  return player.player_state === player.player_states.ACTIVE
}

/**
 * PlayerBaseRequest
 * @class
 */
class PlayerBaseRequest extends GameBaseRequest {

  getPlayer (instance) {
    let { request: { data: { player_id } }, game: { playerManager } } = instance

    return playerManager.get({ id: player_id, safe: true }).then(player => {
      instance.player = player
      return instance
    }).catch(error => Promise.reject(error))
  }

  getPlayerByUser (instance) {
    let { socket, game: { playerManager, id: game_id } } = instance
    let { handshake: { session: { sub: user_id } } } = socket

    return playerManager.getByUser(user_id)
      .then(players => {
        if (players.length === 1) {
          instance.player = players[0]
          return instance
        } else {
          return instance.invalidRequest(`User ${user_id} doesn't have a player for game ${game_id}`)
        }
      })
      .catch(error => Promise.reject(error))
  }

  getPlayerByCode (instance) {
    let { request, game: { playerManager, id: game_id } } = instance
    let { data: { code } } = request

    return playerManager.getByCode(code)
      .then(players => {
        if (players.length === 1) {
          instance.victim = players[0]
          return instance
        } else {
          return instance.invalidRequest(`Player not found for game ${game_id}`)
        }
      })
      .catch(error => Promise.reject(error))
  }

  playerActive (instance) {
    let { player } = instance

    if (!isActive(player)) {
      return instance.forbiddenRequest('Player is inactive')
    }

    return instance
  }

  victimActive (instance) {
    let { victim, game: { id: game_id } } = instance

    if (!isActive(victim)) {
      // For security reasons this response is the same as "player not found"
      // to obscure that the user was found but is not active.
      return instance.invalidRequest(`Player not found for game ${game_id}`)
    }

    return instance
  }

}

/**
 * Export
 * @ignore
 */
module.exports = PlayerBaseRequest
