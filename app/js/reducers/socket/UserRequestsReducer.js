'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * UserRequestsReducer
 * @class
 */
class UserRequestsReducer {

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    switch (type) {
      case 'SUCCESS_USER_GET':
        return this.updateUser(state, data)
      case 'SUCCESS_USER_UPDATE':
        return this.updateUser(state, data)
      default:
        return state
    }
  }

  static updateUser (state, data) {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return state
      }

      return data.reduce((state, curr) => {
        let { id } = curr
        state[id] = curr
        return state
      }, Object.assign({}, state))

    } else {
      let { id } = data
      return Object.assign({}, state, { [id]: data })
    }

    return state
  }
}

/**
 * Export
 * @ignore
 */
export default UserRequestsReducer
