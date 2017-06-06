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
const WordList = require('../../common/WordList')
const Game = require('../../managers/game/Game')

/**
 * RegisterPlayerRequest
 * @class
 */
class RegisterPlayerRequest extends PlayerBaseRequest {

  static handle (request, socket, system) {
    let instance = new RegisterPlayerRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.getGame)
      .then(instance.validateGameState)
      .then(instance.uniqueUser)
      .then(instance.create)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: ['game_id', 'hall'],
      game_state: Game.states.REGISTRATION
    }
  }

  uniqueUser (instance) {
    let { socket, game: { playerManager } } = instance
    let { handshake: { session: { sub } } } = socket

    return playerManager.userUnique(sub).then(exists => {
      if (!exists) {
        return instance.invalidRequest('Player already exists')
      }
      return instance
    }).catch(error => Promise.reject(error))
  }

  create (instance) {
    let { log } = RegisterPlayerRequest
    let { request: { data }, socket, game } = instance
    let { playerManager } = game
    let { handshake: { session } } = socket
    let { sub: user_id, name: user_name, picture: user_picture } = session
    let { game_id, hall, picture, display_name, last_words } = data

    let body = {
      user_id: user_id,
      game_id: game_id,
      hall,
      picture: picture || user_picture,
      display_name: display_name || user_name,
      last_words: last_words || '',
      player_events: [{ type: 'REGISTER', data: { timestamp: moment().valueOf() } }],
      game_events: [],
      missions: []
    }

    log.debug({ player: body }, 'New Player')

    let ensureCodeUnique = (code) => {
      return playerManager.codeUnique(code)
        .then(unique => {
          if (!unique) {
            return ensureCodeUnique(WordList.generateBiteCode())
          } else {
            return code
          }
        })
        .catch(error => Promise.reject(error))
    }

    return ensureCodeUnique(WordList.generateBiteCode())
      .then(code => {
        body.code = code
        return playerManager.store({ body })
      })
      .then(player => {
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
module.exports = RegisterPlayerRequest
