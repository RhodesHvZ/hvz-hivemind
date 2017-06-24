'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * UpdateGameAction
 *
 * @param  {Object} options
 * @param  {String} options.game_id
 * @param  {String} [options.name]
 * @param  {String} [options.registration_date]
 * @param  {String} [options.start_date]
 * @param  {String} [options.end_date]
 * @param  {String} [options.description]
 * @param  {URL} [options.rules]
 * @param  {URL} [options.background_image]
 */
export default function UpdateGameAction (options) {
  let { game_id, name, registration_date, start_date, end_date, description, rules, background_image } = options

  if (!game_id) {
    throw new Error(`Missing required argument 'game_id'`)
  }

  SocketManager.send({
    type: 'GAME_UPDATE',
    data: {
      game_id,
      name,
      registration_date,
      start_date,
      end_date,
      description,
      rules,
      background_image,
    }
  })
}
