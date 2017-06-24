'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * UpdateGameAdminPermissionAction
 *
 * @param  {String} game_id
 * @param  {String} user_id
 * @param  {Number} rank
 */
export default function UpdateGameAdminPermissionAction (game_id, user_id, rank) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!user_id) {
    throw new Error(`Missing required argument 'user_id'`)
  }

  if (!rank) {
    throw new Error(`Missing required argument 'rank'`)
  }

  SocketManager.send({
    type: 'GAME_PERMISSION_UPDATE',
    data: {
      game_id,
      user_id,
      rank
    }
  })
}
