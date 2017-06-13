'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * GetSessionAction
 */
export default function GetSessionAction () {
  SocketManager.send({ type: 'SESSION' })
}
