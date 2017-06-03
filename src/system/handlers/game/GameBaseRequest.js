'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const BaseRequest = require('../BaseRequest')

/**
 * GameBaseRequest
 * @class
 */
class GameBaseRequest extends BaseRequest {

  getGame (instance) {
    let { request: { data: { game_id } }, system } = instance
    let { gameManager } = system

    return gameManager.get({ id: game_id, safe: true }).then(game => {
      instance.game = game
      return instance
    }).catch(error => Promise.reject(error))
  }

  authorization (instance) {
    let { socket, game: { admins }, constructor: { meta } } = instance
    let { handshake: { session } } = socket
    let { authorization_level } = meta
    let { sub: id } = session

    if (!authorization_level) {
      return instance.internalServerError('meta.authorization_level must be provided from the child class of GameBaseRequest')
    }

    let [admin] = admins.filter(admin => admin.id === id)

    if (!admin || admin.rank > authorization_level) {
      return instance.unauthorizedError('Insufficient privilege')
    }

    return instance
  }

  userExists (instance) {
    let { request: { data }, system: { userManager } } = instance
    let { user_id } = data

    return userManager.exists({ id: user_id }).then(result => {
      if (!result) {
        return instance.invalidRequest(`User id ${user_id} does not exist`)
      }
      return instance
    }).catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameBaseRequest
