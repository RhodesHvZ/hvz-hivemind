'use strict'

/**
 * Dependencies
 * @ignore
 */
import SocketManager from '../../SocketManager'

/**
 * GetMailAction
 *
 * @param {Number} [page]
 * @param {Boolean} [sent] - Get sent mail
 */
export default function GetMailAction (page, sent) {
  SocketManager.send({ type: 'USER_GET_MAIL', data: { page, sent } })
}
