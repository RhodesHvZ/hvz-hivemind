'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * UpdatePlayerAction
 *
 * @param  {Object} options
 * @param  {String} options.game_id
 * @param  {String} [options.display_name]
 * @param  {String} [options.last_words]
 * @param  {URL} [options.picture]
 */
export default function UpdatePlayerAction (options) {
  let { game_id, display_name, last_words, picture } = options

  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  SocketManager.send({
    type: 'PLAYER_UPDATE',
    data: {
      game_id,
      display_name,
      last_words,
      picture,
    }
  })
}
