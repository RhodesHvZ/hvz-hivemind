'use strict'

/**
 * Dependencies
 * @ignore
 */
const socketio = require('socket.io')
const Events = require('../events')
const SocketEventEnum = require('../../common/SocketEventEnum')
const SystemManager = require('../system')

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
    //this.systemManager = null

    let { Status, User, Type } = SocketEventEnum

    // On connection
    this.io.on('connection', function (socket) {
      console.log(JSON.stringify(this.systemManager))
      if (!this.systemManager) {
        socket.emit(Status.InternalError)
      } else {
        socket.emit(Status.Success)
      }
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

      socket.on(Type.GET, (request) => {
        console.log(JSON.stringify(request))
        if (request === User.Data) {
          // Fire GET event
          // ...
          socket.emit(Status.Success, { data: 'stjohn', type: User.Firstname } )
          socket.emit(Status.Success, { data: 'giddy', type: User.Lastname } )
        }
      })

      socket.on(Type.REGISTER_USER, (request) => {
          SystemManager.userManager.registerUser(request, socket.id)
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
