'use strict'

/**
 * Dependencies
 * @ignore
 */
import _ from 'lodash'

/**
 * NotificationsReducer
 * @class
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
      notifications.forEach(notification => this.sortedPush(new_state, value))
      return new_state
    }

    return state
  }

  static uniqueNotification (state, data) {
    let notification = this.buildNotification(data)

    return _.findIndex(state, item => _.isEqual(item, notification)) === -1
      ? notification
      : undefined
  }

  static buildNotification (data) {
    let { type } = data

    return {
      title,
      icon,
      text,
      action
    }
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
