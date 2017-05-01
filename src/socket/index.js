'use strict'

/**
 * Dependencies
 * @ignore
 */


var io = null

/**
 * SocketManager
 * @class
 */
class SocketManager {
  
  
  static get Instance() {
    return io
  }

  constructor(socketio) {
    if(io == null) io = socketio
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SocketManager
