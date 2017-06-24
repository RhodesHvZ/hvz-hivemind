'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * GameRequestsReducer
 * @class
 */
class GameRequestsReducer {

  static get typeNames () {
    return [
      'SUCCESS_GAME_GET',
      'SUCCESS_GAME_NEW',
      'SUCCESS_GAME_UPDATE',
      'SUCCESS_GAME_PERMISSION_UPDATE',
      'SUCCESS_GAME_TRANSFER_OWNERSHIP',
    ]
  }

  static reduce (state = {}, action = {}) {
    let { data, type } = action

    if (this.typeNames.includes(type)) {
      return this.updateGames(state, data)
    }

    return state
  }

  static updateGames (state, data) {
    if (Array.isArray(data) && data.length > 0) {
      let updated = data.reduce((acc, game) => {
        let { id } = game
        acc[id] = Object.assign(this.updateGame(state[id], game))
        return acc
      }, {})

      return Object.assign({}, state, updated)

    } else if (typeof data === 'object') {
      let { id } = data
      return Object.assign({}, state, { [id]: this.updateGame(state[id], data) })
    }

    return state
  }

  static updateGame (existing, data) {
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
export default GameRequestsReducer
