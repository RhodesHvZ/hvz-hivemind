'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * SearchPlayerAction
 *
 * @param {String} game_id
 * @param {String} query
 */
export default function SearchPlayerAction (game_id, query) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!query) {
    throw new Error(`Missing required argument 'query'`)
  }

  SocketManager.send({
    type: 'PLAYER_GET',
    data: {
      game_id,
      query,
    }
  })
}
