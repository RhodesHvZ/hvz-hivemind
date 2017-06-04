'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const PlayerBaseRequest = require('./PlayerBaseRequest')
const GameAdminRankEnum = require('../../managers/game/GameAdminRankEnum')

/**
 * GetPlayerRequest
 * @class
 */
class GetPlayerRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new GetPlayerRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.getAdminRank)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id']
    }
  }

  dispatch (instance) {
    let { request: { data } } = instance
    let { player_id } = data

    instance.heartbeat(10)

    if (!player_id) {
      return instance.search(instance)
    } else {
      return instance.lookup(instance)
    }
  }

  search (instance) {
    let { request: { data }, game: { playerManager } } = instance
    let { game_id, query } = data
    let safe = instance.fullAuthorization()

    if (!query) {
      return playerManager.search({ query: { match_all: {} } }, safe)
        .then(players => {
          instance.response = players
          instance.heartbeat(80)
          return instance
        })
        .catch(error => Promise.reject(error))
    }

    let queries = [
      { regexp: { state: `.*${query}.*` } },
      { regexp: { hall: `.*${query}.*` } },
      { regexp: { display_name: `.*${query}.*` } }
    ]

    if (safe) {
      queries.push({ regexp: { super_state: `.*${query}.*` } })
    }

    return playerManager.search({
      query: {
        bool: {
          minimum_should_match: 1,
          must: {
            match: { game: game_id }
          },
          should: queries
        }
      }
    }, safe).then(players => {
        instance.response = players
        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }

  fullAuthorization (player) {
    let { socket, admin_rank } = this
    let { handshake: { session: { sub: id } } } = socket
    let desired_rank = GameAdminRankEnum.SUPER

    if (player) {
      return admin_rank <= desired_rank || player.user === id
    }

    return admin_rank <= desired_rank
  }

  lookup (instance) {
    let { request, system, game: { playerManager } } = instance
    let { data: { player_id: id } } = request
    let { log } = GetPlayerRequest
    let safe = !Array.isArray(id)

    return playerManager.get({ id, safe })
      .then(player => {
        instance.response = player
        if (!instance.fullAuthorization(player)) {
          instance.response = playerManager.type.sanitize(player)
        }

        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GetPlayerRequest
