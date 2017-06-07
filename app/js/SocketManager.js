'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import io from 'socket.io-client'

import store from './store'

/**
 * Socket Connection
 */
const socket = io('http://localhost:3000')

/**
 * SocketManager
 * @class
 */
class SocketManager {

  constructor () {
    socket.on('message', data => this.dispatch(data))
    socket.on('connect', () => this.onConnect())
    socket.on('disconnect', () => this.onDisconnect())
    socket.on('error', error => this.onError(error))
  }

  get socket () {
    return socket
  }

  dispatch (data) {
    let { type, request_type } = data

    let redux_type = request_type
      ? `${type}_${request_type}`
      : type

    console.log(type, data)
    store.dispatch({ type: redux_type, data })
  }

  onConnect () {
    console.log('connected')
  }

  onDisconnect () {
    console.log('disconnected')
  }

  onError (error) {
    console.error(error)
  }

  send (data) {
    socket.emit('message', data)
  }

}

export default new SocketManager()
