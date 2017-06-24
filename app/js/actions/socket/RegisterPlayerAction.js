'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * RegisterPlayerAction
 *
 * @param {String} game_id
 * @param {String} hall
 */
export default function RegisterPlayerAction (game_id, hall) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!hall) {
    throw new Error(`Missing required argument 'hall'`)
  }

  SocketManager.send({
    type: 'PLAYER_REGISTER',
    data: {
      game_id,
      hall
    }
  })
}
