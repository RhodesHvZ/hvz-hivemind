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
 * PlayerGetRequest
 * @class
 */
class PlayerGetRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new PlayerGetRequest(request, socket, system)

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
      {
        nested: {
          path: 'player_events',
          query: {
            match: { 'player_events.type': query }
          }
        }
      },
      { regexp: { hall: `.*${query}.*` } },
      { regexp: { display_name: `.*${query}.*` } }
    ]

    if (safe) {
      queries.push({
        nested: {
          path: 'game_events',
          query: {
            regexp: { 'game_events.data.super_state': `.*${query}.*` }
          }
        }
      })
    }

    return playerManager.search({
      query: {
        bool: {
          minimum_should_match: 1,
          must: {
            match: { game_id }
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
      return admin_rank <= desired_rank || player.user_id === id
    }

    return admin_rank <= desired_rank
  }

  lookup (instance) {
    let { request, system, game: { playerManager } } = instance
    let { data: { player_id: id } } = request
    let { log } = PlayerGetRequest
    let safe = !Array.isArray(id)

    return playerManager.get({ id, safe })
      .then(player => {
        if (!instance.fullAuthorization(player)) {
          instance.response = playerManager.type.sanitize(player)
        } else {
          player.states = {
            player: player.player_state,
            game: player.game_state,
            super: player.super_state
          }
          instance.response = player
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
module.exports = PlayerGetRequest
