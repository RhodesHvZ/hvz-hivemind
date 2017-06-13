'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * HeartbeatAction
 */
export default function HeartbeatAction () {
  SocketManager.send({ type: 'HEARTBEAT' })
}
