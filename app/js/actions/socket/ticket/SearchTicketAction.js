'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * SearchTicketAction
 *
 * @param {String} query
 */
export default function SearchTicketAction (query) {
  if (!query) {
    throw new Error(`Missing required argument 'query'`)
  }

  SocketManager.send({
    type: 'TICKET_GET',
    data: {
      query
    }
  })
}
