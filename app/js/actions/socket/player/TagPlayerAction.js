'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * TagPlayerAction
 *
 * @param  {String} game_id
 * @param  {String} code
 * @param  {String} lat
 * @param  {String} lon
 * @param  {String} [note]
 */
export default function TagPlayerAction (game_id, code, lat, lon, note) {
  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  if (!code) {
    throw new Error(`Missing required argument 'code'`)
  }

  if (!lat) {
    throw new Error(`Missing required argument 'lat'`)
  }

  if (!lon) {
    throw new Error(`Missing required argument 'lon'`)
  }

  SocketManager.send({
    type: 'PLAYER_TAG',
    data: {
      game_id,
      code,
      lat,
      lon,
      note
    }
  })
}
