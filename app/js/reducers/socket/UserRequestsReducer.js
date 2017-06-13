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
      return this.updateUsers(state, data)
    }

    return state
  }

  static updateUsers (state, data) {
    if (Array.isArray(data) && data.length > 0) {
      let updated = data.reduce((acc, user) => {
        let { id } = user
        acc[id] = Object.assign(this.updateUser(state[id], user))
        return acc
      }, {})

      return Object.assign({}, state, updated)

    } else if (typeof data === 'object') {
      let { id } = data
      return Object.assign({}, state, { [id]: this.updateUser(state[id], data) })
    }

    return state
  }

  static updateUser (existing, data) {
    if (data) {
      return existing ? Object.assign({}, existing, data) : data
    }

    return existing || {}
  }
}

/**
 * Export
 * @ignore
 */
export default UserRequestsReducer
