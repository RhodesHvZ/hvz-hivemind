'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * DeactivatePlayerAction
 *
 * @param {String} game_id
 * @param {String} player_id
 */
export default function DeactivatePlayerAction (game_id, player_id) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!player_id) {
    throw new Error(`Missing required argument 'player_id'`)
  }

  SocketManager.send({
    type: 'PLAYER_DEACTIVATE',
    data: {
      game_id,
      player_id,
    }
  })
}
