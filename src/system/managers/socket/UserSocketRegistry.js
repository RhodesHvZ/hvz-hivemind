'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */

/**
 * UserSocketRegistry
 * @class
 */
class UserSocketRegistry {

  /**
   * constructor
   */
  constructor () {
    Object.defineProperty(this, 'registry', { value: [], enumerable: true })
  }

  /**
   * register
   *
   * @description
   * Register new socket-user relationship
   *
   * @param  {String} user_id
   * @param  {String} socket_id
   */
  register (user_id, socket_id) {
    this.registry.push({ user_id, socket_id })
  }

  /**
   * deregister
   *
   * @description
   * Remove a socket-user relationship
   *
   * @param  {String} id - either socket/user id
   */
  deregister (id) {
    let idx = this.registry.findIndex(item =>
      item.user_id === id || item.socket_id === id)
    this.registry.splice(idx, 1)
  }

  /**
   * getSocketId
   *
   * @description
   * Get the socket_id for a user
   *
   * @param  {String} user_id
   * @return {String}
   */
  getSocketId (user_id) {
    let item = this.registry.find(item => item.user_id === user_id)
    return item.socket_id
  }

}

/**
 * Export
 * @ignore
 */
module.exports = UserSocketRegistry
