'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * GetTicketAction
 *
 * @param {String} ticket_id
 */
export default function GetTicketAction (ticket_id) {
  if (!ticket_id) {
    throw new Error(`Missing required argument 'ticket_id'`)
  }

  SocketManager.send({
    type: 'TICKET_GET',
    data: {
      ticket_id
    }
  })
}
