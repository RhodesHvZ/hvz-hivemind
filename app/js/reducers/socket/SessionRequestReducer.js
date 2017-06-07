'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * SessionRequestReducer
 * @class
 */
class SessionRequestReducer {

  static get typeName () {
    return 'SUCCESS_SESSION'
  }

  static reduce (state = {}, action) {
    if (action && action.type === this.typeName) {
      let { data } = action

      if (data.user_id) {
        return Object.assign({}, data, { loggedIn: true })
      }

      return { loggedIn: false }
    }

    return state
  }
}

/**
 * Export
 * @ignore
 */
export default SessionRequestReducer
