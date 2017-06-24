'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * TransferGameOwnershipAction
 *
 * @param  {String} game_id
 * @param  {String} user_id
 */
export default function TransferGameOwnershipAction (game_id, user_id) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!user_id) {
    throw new Error(`Missing required argument 'user_id'`)
  }

  SocketManager.send({
    type: 'GAME_TRANSFER_OWNERSHIP',
    data: {
      game_id,
      user_id,
    }
  })
}
