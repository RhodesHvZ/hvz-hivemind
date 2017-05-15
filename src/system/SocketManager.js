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

    if (uid) {
      this.users[uid] = socket.id
    }

    socket.on('disconnect', reason => this.onSocketDisconnect(socket, reason))
    socket.on('message', data => this.onSocketMessage(socket, data))
    socket.on('GET', data => this.onSocketMessage(socket, data))
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
   * send
   *
   * @description
   * Send data to a socket indexed by Socket ID
   *
   * @param {String} id
   * @param {Object} data
   * @return {Boolean} success
   */
  send (id, data) {
    let socket = this.socket.connected[id]

    if (socket) {
      socket.emit('message', data)
      return true
    }

    return false
  }

  /**
   * sendUser
   *
   * @description
   * Send data to a socket indexed by User ID
   *
   * @param {String} uid
   * @param {Object} data
   * @return {Boolean} success
   */
  sendUser (uid, data) {
    let id = this.users[uid]

    return id
      ? this.send(id, data)
      : false
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SocketManager
