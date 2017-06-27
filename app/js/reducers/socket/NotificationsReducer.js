'use strict'

/**
 * Dependencies
 * @ignore
 */
import _ from 'lodash'

/**
 * Notifications
 * @ignore
 */
import PrivateMessageNotification from './notifications/PrivateMessageNotification'
import NewTicketNotification from './notifications/NewTicketNotification'
import ReplyTicketNotification from './notifications/ReplyTicketNotification'

/**
 * NotificationBuilders
 * @ignore
 */
const builders = {
  PRIVATE_MESSAGE: PrivateMessageNotification,
  TICKET_NEW: NewTicketNotification,
  TICKER_REPLY: ReplyTicketNotification,
}

/**
 * NotificationsReducer
 * @ignore
 */
class NotificationsReducer {

  static reduce (state = [], action = {}) {
    let { data, type } = action

    if (type === 'MAIL') {
      let notification = this.buildNotification(data)
      return notification ? [notification].concat(state) : state
    } else if (type === 'SUCCESS_USER_GET_MAIL' && data.length > 0) {
      return this.updateNotifications(state, data)
    }

    return state
  }

  static updateNotifications (state, data) {
    let notifications = _.compact(data.map(item => this.uniqueNotification(state, item)))

    if (notifications.length > 0) {
      let new_state = state.slice()
      notifications.forEach(notification => this.sortedPush(new_state, notification))
      return new_state
    }

    return state
  }

  static uniqueNotification (state, data) {
    let notification = this.buildNotification(data)

    return state.findIndex(item => _.isEqual(item, notification)) === -1
      ? notification
      : undefined
  }

  static buildNotification (data) {
    let { type } = data
    let builder = builders[type]

    if (builder) {
      return builder(data)
    }

    throw new Error(`Notification type ${type} is not implemented yet`)
  }

  static sortedPush (array, value) {
    array.splice(_.sortedIndexBy(array, value, 'timestamp'), 0, value)
  }
}

/**
 * Export
 * @ignore
 */
export default NotificationsReducer
