'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * RemovePlayerSuperstateAction
 *
 * @param  {String} game_id
 * @param  {String} player_id
 * @param  {String} superstate
 */
export default function RemovePlayerSuperstateAction (game_id, player_id, superstate) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!player_id) {
    throw new Error(`Missing required argument 'player_id'`)
  }

  if (!superstate) {
    throw new Error(`Missing required argument 'superstate'`)
  }

  SocketManager.send({
    type: 'PLAYER_SUPERSTATE',
    data: {
      game_id,
      player_id,
      superstate,
      remove: true,
    }
  })
}
