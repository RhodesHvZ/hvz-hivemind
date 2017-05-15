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
 * BaseRequest
 * @class
 */
class BaseRequest {

  constructor (request, socket, system) {
    this.request = request
    this.socket = socket
    this.system = system
  }

  internalServerError () {
    // TODO
  }

  heartbeat () {
    // TODO
  }

  success (response) {
    let { socket } = this

    // TODO

    console.log(response)
  }
}

/**
 * Export
 * @ignore
 */
module.exports = BaseRequest
