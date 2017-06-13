'use strict'

/**
 * Dependencies
 * @ignore
 */
import _ from 'lodash'

/**
 * IncomingPrivateMessagesReducer
 * @class
 */
class IncomingPrivateMessagesReducer {

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    if (type === 'MAIL' && data.type === 'PRIVATE_MESSAGE') {
      return this.newMail(state, data)
    } else if (type === 'SUCCESS_USER_GET_MAIL' && data.length > 0) {
      return this.updateInbox(state, data)
    }

    return state
  }

  static newMail (state, data) {
    let { data: { message, sender_id: user_id }, timestamp } = data
    let arr = state[user_id] ? state[user_id].slice() : []

    let messageObject = {
      message,
      timestamp,
      delivered: true
    }

    this.sortedPush(arr, messageObject)
    return Object.assign({}, state, { [user_id]: arr })
  }

  static updateInbox (state, data) {
    let newMessages = data.filter(item => {
      let { id: message_id, user_id } = item
      return state[user_id] ? state[user_id].findIndex(message => message.message_id === message_id) === -1 : true

    }).reduce((acc, message) => {
      let { data: { message: message_text, sender_id: user_id }, id: message_id, delivered, timestamp } = message
      let arr

      if (!acc[user_id]) {
        arr = state[user_id] ? state[user_id].slice() : []
        acc[user_id] = arr
      } else {
        arr = acc[user_id]
      }

      let messageObject = {
        message_id,
        message: message_text,
        timestamp,
        delivered
      }

      let findIdx = arr.findIndex(message => message.timestamp === timestamp)
      if (findIdx > -1) {
        arr[findIdx] = Object.assign({}, arr[findIdx], { message_id })
      } else {
        this.sortedPush(arr, messageObject)
      }

      return acc
    }, {})

    return Object.assign({}, state, newMessages)
  }

  static sortedPush (array, value) {
    array.splice(_.sortedIndexBy(array, value, 'timestamp'), 0, value)
  }
}

/**
 * Export
 * @ignore
 */
export default IncomingPrivateMessagesReducer
