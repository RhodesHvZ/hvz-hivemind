'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * SuspendPlayerAction
 *
 * @param {String} game_id
 * @param {String} player_id
 * @param {String} until
 * @param {String} [reason]
 */
export default function SuspendPlayerAction (game_id, player_id, until, reason) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!player_id) {
    throw new Error(`Missing required argument 'player_id'`)
  }

  if (!until) {
    throw new Error(`Missing required argument 'until'`)
  }

  SocketManager.send({
    type: 'PLAYER_SUSPEND',
    data: {
      game_id,
      player_id,
      until,
      reason
    }
  })
}
