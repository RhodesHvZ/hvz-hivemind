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
 * UserGetRequest
 * @class
 */
class UserGetRequest extends BaseRequest {

  static handle (request, socket, system) {
    let instance = new UserGetRequest(request, socket, system)

    return Promise.resolve(instance)
      .then(instance.ensureRequestFields)
      .then(instance.authenticated)
      .then(instance.dispatch)
      .then(instance.success)
      .catch(error => instance.internalServerError(error))
  }

  static get meta () {
    return {
      request_fields: []
    }
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

    return userManager.search({
      query: {
        bool: {
          should: [
            { regexp: { name: `.*${query}.*` } },
            { regexp: { email: `.*${query}.*` } }
          ]
        }
      }
    }).then(users => {
        instance.response = users
        instance.heartbeat(80)
        return instance
      })
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

    return userManager.get({ id, safe: instance.fullAuthorization() })
      .then(user => {
        instance.response = user
        instance.heartbeat(80)
        return instance
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserGetRequest
