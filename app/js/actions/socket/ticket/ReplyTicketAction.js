'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * TicketReplyAction
 *
 * @param  {Object} options
 * @param  {String} options.ticket_id
 * @param  {String} options.message
 * @param  {String} [options.state]
 */
export default function TicketReplyAction (options) {
  let { ticket_id, message, state } = options

  if (!ticket_id) {
    throw new Error(`Missing required argument 'ticket_id'`)
  }

  if (!message) {
    throw new Error(`Missing required argument 'message'`)
  }

  SocketManager.send({
    type: 'TICKET_REPLY',
    data: {
      ticket_id,
      message,
      state,
    }
  })
}
