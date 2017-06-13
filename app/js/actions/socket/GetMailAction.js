'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * GetMailAction
 */
export default function GetMailAction () {
  SocketManager.send({ type: 'USER_GET_MAIL' })
}
