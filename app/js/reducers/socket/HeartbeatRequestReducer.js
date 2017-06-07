'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * HeartbeatRequestReducer
 * @class
 */
class HeartbeatRequestReducer {

  static reduce (previous = {}, action) {
    if (action && action.socket_data && action.timestamp) {
      let { timestamp } = action
      return { timestamp }
    }

    return previous
  }
}

/**
 * Export
 * @ignore
 */
export default HeartbeatRequestReducer
