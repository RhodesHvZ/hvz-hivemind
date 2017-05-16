'use strict'

/**
 * Dependencies
 * @ignore
 */
const socketio = require('socket.io')

/**
 * Module Dependencies
 * @ignore
 */
const MessageDispatcher = require('./MessageDispatcher')

/**
 * Socket Manager
 * @class
 */
class SocketManager {

  /**
   * constructor
   */
  constructor (system) {
    this.system = system
    this.io = socketio(system.server)
    this.socket = this.io.sockets
    this.io.on('connect', socket => this.onServerConnection(socket))
    this.users = {}
  }

  /**
   * onServerConnection
   *
   * @description
   * Callback for when a new socket connection is made to the server.
   *
   * @param {Socket} socket
   */
  onServerConnection (socket) {
    console.log(`Socket #${socket.id} connected`)
    let { request: { session } } = socket
    let uid // = session.sub // TODO

    socket.request.session.count = session.count + 1 || 1 // DEBUG
    console.log(`Socket #${socket.id} session: ${JSON.stringify(session, null, 2)}`) // DEBUG

    if (uid) {
      this.users[uid] = socket.id
    }

    socket.on('disconnect', reason => this.onSocketDisconnect(socket, reason))
    socket.on('message', data => this.onSocketMessage(socket, data))
    socket.on('GET', data => this.onSocketMessage(socket, data)) // DEBUG
    socket.on('error', error => this.onSocketError(socket, error))
  }

  /**
   * onSocketDisconnect
   *
   * @description
   * Callback for when a socket connection closes.
   *
   * @param {Socket} socket
   */
  onSocketDisconnect (socket, reason) {
    console.log(`Socket #${socket.id} disconnect: ${reason}`)
  }


  /**
   * onSocketMessage
   *
   * @description
   * Callback for an incoming connection on a socket.
   *
   * @param {Socket} socket
   * @param {Object} data
   */
  onSocketMessage (socket, data) {
    console.log(`Socket #${socket.id} new message: ${JSON.stringify(data, null, 2)}`)
    MessageDispatcher.handle(data, socket, this.system).then(() => console.log('done'))
  }

  /**
   * onSocketError
   *
   * @description
   * Callback for when a socket fires an error event
   *
   * @param {Socket} socket
   * @param {Error} error
   */
  onSocketError (socket, error) {
    console.error(`Socket #${socket.id} error: ${error}`)
    socket.disconnect(true)
  }

  /**
   * getSocket
   *
   * @description
   * Retrieve a socket indexed by Socket ID
   *
   * @param {String} id
   * @return {Socket}
   */
  getSocket (id) {
    let socket = this.socket.connected[id]
    return socket ? socket : null
  }

  /**
   * getUserSocket
   *
   * @description
   * Retrieve a socket indexed by User ID
   *
   * @param {String} uid
   * @return {Socket}
   */
  getUserSocket (uid) {
    let id = this.users[uid]

    return id
      ? this.getSocket(id)
      : false
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SocketManager
