'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../../SocketManager'

/**
 * SearchUserAction
 *
 * @param {String} query
 */
export default function SearchUserAction (query) {
  if (!query) {
    throw new Error(`Missing required argument 'query'`)
  }

  SocketManager.send({
    type: 'USER_GET',
    data: {
      query
    }
  })
}
