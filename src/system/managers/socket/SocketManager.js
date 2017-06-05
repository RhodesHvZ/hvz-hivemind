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
const MessageDispatcher = require('../../MessageDispatcher')
const Logger = require('../../../logger')

/**
 * Logger
 * @ignore
 */
const log = Logger.bootLogger

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
    log.trace({ id: socket.id }, `Socket connected`)
    let { handshake: { session } } = socket

    log.debug({ session, id: socket.id }, `Socket session`)

    socket.on('disconnect', reason => this.onSocketDisconnect(socket, reason))
    socket.on('message', data => this.onSocketMessage(socket, data))
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
    log.warn({ id: socket.id, reason }, `Socket disconnect`)
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
    let { handshake: { session } } = socket

    log.debug({ id: socket.id, data }, `Socket new message`)
    MessageDispatcher.handle(data, socket, this.system)
      .then(() => {
        session.touch()
        session.save()
        log.trace({ id: socket.id }, 'message handling complete')
      })
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
    log.warn({ id: socket.id, error }, `Socket error`)
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
}

/**
 * Export
 * @ignore
 */
module.exports = SocketManager
