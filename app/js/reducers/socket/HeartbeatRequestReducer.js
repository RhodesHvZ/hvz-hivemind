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

  static reduce (previous = {}, action = {}) {
    if (action.socket_data && action.timestamp) {
      let { timestamp, type, request_type: last_request_type, data } = action
      return { timestamp, last_request_type, success: type.startsWith('SUCCESS') }
    }

    return previous
  }
}

/**
 * Export
 * @ignore
 */
export default HeartbeatRequestReducer
