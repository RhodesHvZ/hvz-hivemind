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

      }
  setupHandlers(systemManager) {
    let { Status, User, Type } = SocketEventEnum
    this.systemManager = systemManager
    // On connection
    this.io.on('connection', function (socket) {
      if (!systemManager) {
        console.log(`Internal Server Error: systemManager is not defined in SocketManager: ${systemManager}`)
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
      // GET data example
      socket.on(Type.GET, (request) => {
        console.log(JSON.stringify(request))
        if (request === User.Data) {
          // Fire GET event
          // ...
          socket.emit(Status.Success, { data: 'stjohn', type: User.Firstname } )
          socket.emit(Status.Success, { data: 'giddy', type: User.Lastname } )
        }
      })
      // Send data example
      socket.on(Type.REGISTER_USER, (request) => {
          this.systemManager.userManager.registerUser(request, socket.id)
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
