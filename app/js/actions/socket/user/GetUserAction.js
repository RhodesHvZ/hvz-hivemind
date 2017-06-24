'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * GetUserAction
 *
 * @param {String} user_id
 */
export default function GetUserAction (user_id) {
  if (!user_id) {
    throw new Error(`Missing required argument 'user_id'`)
  }

  SocketManager.send({
    type: 'USER_GET',
    data: {
      id: user_id
    }
  })
}
