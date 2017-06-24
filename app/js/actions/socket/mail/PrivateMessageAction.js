'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * PrivateMessageAction
 */
export default function PrivateMessageAction (user_id, message) {
  if (!user_id) {
    throw new Error(`Missing required argument 'user_id'`)
  }

  if (!message) {
    throw new Error(`Missing required argument 'message'`)
  }

  SocketManager.send({
    type: 'USER_MESSAGE',
    data: {
      user_id,
      message
    }
  })
}
