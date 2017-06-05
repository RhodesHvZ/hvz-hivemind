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

    let admin = admins.find(admin => admin.user_id === id)

    if (!admin || admin.rank > authorization_level) {
      return instance.unauthorizedError('Insufficient privilege')
    }

    return instance
  }

  getAdminRank (instance) {
    let { socket, game: { admins } } = instance
    let { handshake: { session } } = socket
    let { sub: id } = session

    let admin = admins.find(admin => admin.user_id === id)

    if (!admin) {
      Object.defineProperty(instance, 'admin_rank', { value: 1000 })
    } else {
      Object.defineProperty(instance, 'admin_rank', { value: admin.rank })
    }

    return instance
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GameBaseRequest
