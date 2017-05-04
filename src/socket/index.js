'use strict'

/**
 * Dependencies
 * @ignore
 */
const socketio = require('socket.io')
const Events = require('../events')

/**
 * SocketManager
 *
 * @class
 * This singleton class handles the socket server.
 *
 * @todo inject session info into sockets
 */
class SocketManager {

  /**
   * constructor
   *
   * @param {HTTPServer} server
   */
  constructor (server) {
    this.io = socketio(server)
    this.sockets = {}

    this.io.on('connection', function (socket) {
      console.log('client connected')

      socket.on('message', function (data) {
        console.log(data)
      })

      socket.on('PLAYER_TAG', data => {
        Events.PLAYER_TAG(data)
      })
    })
  }
}

/**
 * Export
 * @ignore
 */
module.exports = (app) => {
  let instance = new SocketManager(app)
  module.exports = instance
  return instance
}
