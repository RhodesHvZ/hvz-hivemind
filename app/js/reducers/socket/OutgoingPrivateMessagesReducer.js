'use strict'

/**
 * Dependencies
 * @ignore
 */
import _ from 'lodash'

/**
 * OutgoingPrivateMessagesReducer
 * @class
 */
class OutgoingPrivateMessagesReducer {

  static get typeNames () {
    return [
      'SUCCESS_USER_GET_MAIL',
      'SUCCESS_USER_MESSAGE',
    ]
  }

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    if (this.typeNames.includes(type)) {
      return this.updateSent(state, data)
    }

    return state
  }

  static updateSent (state, data) {
    let { timestamp } = data

    if (Array.isArray(data) && data.length > 0) {

      let newSentMessages = data.filter(item => {
        let { id: message_id, user_id } = item
        return state[user_id] ? state[user_id].findIndex(message => message.message_id === message_id) === -1 : true

      }).reduce((acc, message) => {
        let { data: { message: message_text }, id: message_id, delivered, timestamp, user_id } = message
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

        this.sortedPush(arr, messageObject)
        return acc
      }, {})

      return Object.assign({}, state, newSentMessages)

    } else if (typeof data === 'object') {
      let { message_id, message, user_id, delivered } = data
      let arr = state[user_id] ? state[user_id].slice() : []

      let message_idx = arr.findIndex(item => item.message_id === message_id)
      if (message_idx === -1) {
        this.sortedPush(arr, {
          message_id,
          message,
          timestamp,
          delivered
        })
      } else {
        arr[user_id] = Object.assign({}, arr[user_id], { delivered })
      }

      return Object.assign({}, state, { [user_id]: arr })
    }

    return state
  }

  static sortedPush (array, value) {
    array.splice(_.sortedIndexBy(array, value, 'timestamp'), 0, value)
  }
}

/**
 * Export
 * @ignore
 */
export default OutgoingPrivateMessagesReducer
