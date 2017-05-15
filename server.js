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
const session = require("express-session")

/**
 * Application
 * @class
 */
class Application {

  constructor (data) {
    // Prepare data for startup
    //let { config, somedata } = data
    this.systemManager = new SystemManager(server)
    //this.config = config
  }

  static setup (data) {
    let instance = new Application(data)

    return Promise.resolve(instance)
      .then(instance.expressConfig)
      .then(instance.listen)
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

    let sessionMiddleware = session({
      secret: "keyboard cat",
    })

    let { socketManager: { socket: socketNamespace } } = instance.systemManager

    socketNamespace.use((socket, next) => {
      sessionMiddleware(socket.request, socket.request.res, next)
    })

    app.use(sessionMiddleware)

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
  .catch(err => console.error(`Error starting server`, err))
