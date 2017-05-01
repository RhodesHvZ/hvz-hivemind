'use strict'

/**
 * Dependencies
 * @ignore
 */
const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

/**
 * Module Dependencies
 * @ignore
 */
const pkg = require('./package.json')
const Events = require('./src/events')
const UserManager = require('./src/user')
const SocketManager = require('./src/socket')
/**
 * App
 * @ignore
 */
const app = express()


/**
 * Setup
 */

app.use(express.static('dist'))
//app.use(compression())
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
//app.use(cors({
//  origin: '*',
//  methods: ['GET', 'POST', 'DELETE'],
//  preflightContinue: false
//}))

/**
 * Listen
 */
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`)
})

/**
 * Socket IO
 * @ignore
 */
const io = socketio(server)
const socketManager = new SocketManager(io)

Events.USER_REGISTERED({ foo: 'bar' })

io.on('connection', function (socket) {
  console.log('client connected')
  socket.on('message', function (data) {
    console.log(data)
  })
})  
