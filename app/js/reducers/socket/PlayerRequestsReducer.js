'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * PlayerRequestsReducer
 * @class
 */
class PlayerRequestsReducer {

  static get typeNames () {
    return [
      'SUCCESS_PLAYER_GET',
      'SUCCESS_PLAYER_UPDATE',
      'SUCCESS_PLAYER_REGISTER',
      'SUCCESS_PLAYER_ACTIVATE',
      'SUCCESS_PLAYER_DEACTIVATE',
      'SUCCESS_PLAYER_SUSPEND',
      'SUCCESS_PLAYER_KILL',
      'SUCCESS_PLAYER_REVIVE',
      'SUCCESS_PLAYER_SUPERSTATE',
      'SUCCESS_PLAYER_TAG',
    ]
  }

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    if (this.typeNames.includes(type)) {
      return this.updatePlayers(state, data)
    }

    return state
  }

  static updatePlayers (state, data) {
    if (Array.isArray(data) && data.length > 0) {
      let updated = data.reduce((acc, player) => {
        let { id } = player
        acc[id] = Object.assign(this.updatePlayer(state[id], player))
        return acc
      }, {})

      return Object.assign({}, state, updated)

    } else if (typeof data === 'object') {
      let { id } = data
      return Object.assign({}, state, { [id]: this.updatePlayer(state[id], data) })
    }

    return state
  }

  static updatePlayer (existing, data) {
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
export default PlayerRequestsReducer
