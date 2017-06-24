'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * RevokeGameAdminPermissionAction
 *
 * @param  {String} game_id
 * @param  {String} user_id
 */
export default function RevokeGameAdminPermissionAction (game_id, user_id) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!user_id) {
    throw new Error(`Missing required argument 'user_id'`)
  }

  SocketManager.send({
    type: 'GAME_PERMISSION_UPDATE',
    data: {
      game_id,
      user_id,
      revoke: true,
    }
  })
}
