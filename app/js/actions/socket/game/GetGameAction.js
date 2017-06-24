'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * GetGameAction
 *
 * @param {String} game_id
 */
export default function GetGameAction (game_id) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  SocketManager.send({
    type: 'GAME_GET',
    data: {
      game_id
    }
  })
}
