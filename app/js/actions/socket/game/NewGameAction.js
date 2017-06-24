'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * NewGameAction
 *
 * @param  {Object} options
 * @param  {String} options.name
 * @param  {String} options.registration_date
 * @param  {String} options.start_date
 * @param  {String} options.end_date
 * @param  {String} [options.description]
 * @param  {URL} [options.rules]
 * @param  {URL} [options.background_image]
 */
export default function NewGameAction (options) {
  let { name, registration_date, start_date, end_date, description, rules, background_image } = options

  if (!name) {
    throw new Error(`Missing required argument 'name'`)
  }

  if (!registration_date) {
    throw new Error(`Missing required argument 'registration_date'`)
  }

  if (!start_date) {
    throw new Error(`Missing required argument 'start_date'`)
  }

  if (!end_date) {
    throw new Error(`Missing required argument 'end_date'`)
  }

  SocketManager.send({
    type: 'GAME_NEW',
    data: {
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
