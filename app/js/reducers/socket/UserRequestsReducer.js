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

  static get typeNames () {
    return [
      'SUCCESS_USER_GET',
      'SUCCESS_USER_UPDATE'
    ]
  }

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    if (this.typeNames.includes(type)) {
      return this.userUpdate(state, data)
    }

    return state
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
