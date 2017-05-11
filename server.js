'use strict'

/**
 * Dependencies
 * @ignore
 */
const path = require('path')
const express = require('express')
const http = require('http')

/**
 * Module Dependencies
 * @ignore
 */
const pkg = require('./package.json')
const Events = require('./src/events')
const SystemManager = require('./src/system')

/**
 * App
 * @ignore
 */
const app = express()
const server = http.Server(app)
const SocketManager = require('./src/socket')(server)
const session = require("express-session")

/**
 * Application
 * @class
 */
class Application {

  constructor (data) {
    // Prepare data for startup
    //let { config, somedata } = data
    this.systemManager = new SystemManager()
    //this.config = config
  }

  static setup (data) {
    let instance = new Application(data)

    return Promise.resolve(instance)
      .then(instance.setupSocketManager)
      .then(instance.setupSystemManager)
      .then(instance.expressConfig)
      .then(instance.listen)
  }

  setupSocketManager (instance) {
    // Set up middleware
    var sessionMiddleware = session({
      secret: "keyboard cat",
    });

    SocketManager.io.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    app.use(sessionMiddleware)
    // Set SystemManager for SocketManager
    SocketManager.setupHandlers(instance.systemManager)
    return instance
  }

  // Init the system manager
  setupSystemManager (instance) {
    //instance.systemManager = new SystemManager()
    return instance
  }

  expressConfig (instance) {
    app.use(express.static('dist'))
    //app.use(compression())
    //app.use(bodyParser.urlencoded({ extended: false }))
    //app.use(bodyParser.json())
    //app.use(cors({
      //origin: '*',
      //methods: ['GET', 'POST', 'DELETE'],
      //preflightContinue: false
    //}))

    return instance
  }

  listen (instance) {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Listening on port ${process.env.PORT || 3000}`)
    })
  }
}

/**
 * Start
 * @ignore
 */
Application.setup({})
  .then(() => console.log('Server started successfully'))
  .catch(err => console.error(`Error starting server:\n${err}`))
