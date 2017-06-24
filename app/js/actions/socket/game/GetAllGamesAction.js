'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * GetAllGamesAction
 */
export default function GetAllGamesAction (query) {
  SocketManager.send({ type: 'GAME_GET' })
}
