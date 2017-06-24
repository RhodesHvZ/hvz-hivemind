'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * KillPlayerAction
 *
 * @param {String} game_id
 * @param {String} player_id
 * @param {String} [reason]
 */
export default function KillPlayerAction (game_id, player_id, reason) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!player_id) {
    throw new Error(`Missing required argument 'player_id'`)
  }

  SocketManager.send({
    type: 'PLAYER_KILL',
    data: {
      game_id,
      player_id,
      reason
    }
  })
}
