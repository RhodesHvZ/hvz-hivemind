'use strict'

/**
 * Reducer
 *
 * @class
 * Base class for Redux store reducers
 */
class Reducer {

  static get mapping () {
    throw new Error('needs to be overriden in the child class')
  }

  static handle (oldState, action) {
    let { mapping } = this
    let { type } = action
    let changes

     // Redux init reducer fix
    if (type === '@@redux/INIT') {
      return oldState
    }

    if (mapping[type]) {
      changes = mapping[type](oldState, action)
    } else {
      throw new Error(`Action type ${type} doesn't exist for ${this.name}`)
    }

    if (changes && typeof changes === 'object') {
      Object.assign({}, oldState, changes)
    } else {
      return oldState
    }
  }
}

/**
 * Export
 * @ignore
 */
module.exports = Reducer
