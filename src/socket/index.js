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
      console.log(`Session: ${JSON.stringify(socket.request.session)}`)

      socket.on('message', function (data) {
        console.log(data)
      })

      socket.on('PLAYER_ACTIVATE', data => {
        // fireEvent(Events.PLAYER_TAG, socket, data)
        data.senderId = socket.id;
        Events.PLAYER_ACTIVATE(data)
        console.log('Socketio got PLAYER_ACTIVATE')
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
