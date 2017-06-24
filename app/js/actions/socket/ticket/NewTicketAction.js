'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * NewTicketAction
 *
 * @param  {Object} options
 * @param  {String} options.subject
 * @param  {String} options.message
 * @param  {String} [options.game_id]
 */
export default function NewTicketAction (options) {
  let { subject, message, game_id } = options

  if (!subject) {
    throw new Error(`Missing required argument 'subject'`)
  }

  if (!message) {
    throw new Error(`Missing required argument 'message'`)
  }

  SocketManager.send({
    type: 'TICKET_NEW',
    data: {
      subject,
      message,
      game_id,
    }
  })
}
