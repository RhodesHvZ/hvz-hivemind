'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const BaseRequest = require('../BaseRequest')

/**
 * GetUserRequest
 * @class
 */
class GetUserRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new GetUserRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get required_fields () {
    return []
  }

  dispatch (instance) {
    let { request: { data: { id, query } } } = instance

    if (!id && !query) {
      return instance.invalidRequest('id or query must be present')
    }

    instance.heartbeat(10)

    if (query) {
      return instance.search(instance)
    } else {
      return instance.lookup(instance)
    }
  }

  search (instance) {
    let { request, system } = instance
    let { userManager } = system
    let { data: { query } } = request

    return userManager.searchUser({
      bool: {
        should: [
          { regexp: { name: `.*${query}.*` } },
          { regexp: { email: `.*${query}.*` } }
        ]
      }
    }).then(users => {
        instance.response = users
        instance.heartbeat(80)
      })
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }

  fullAuthorization () {
    let { request, socket } = this
    let { handshake: { session: { sub } } } = socket
    let { data: { id } } = request

    this.heartbeat(30)

    if (Array.isArray(id)) {
      return false
    }

    return id === sub
  }

  lookup (instance) {
    let { request, system } = instance
    let { userManager } = system
    let { data: { id } } = request

    return userManager.getUser(id, instance.fullAuthorization())
      .then(user => {
        instance.response = user
        instance.heartbeat(80)
      })
      .then(() => instance)
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = GetUserRequest
