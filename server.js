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
const UserManager = require('./src/user')

/**
 * App
 * @ignore
 */
const app = express()
const server = http.Server(app)
const SocketManager = require('./src/socket')(server)

/**
 * Application
 * @class
 */
class Application {

  constructor (data) {
    // Prepare data for startup
    let { config, somedata } = data

    this.config = config
    this.somedata = data
  }

  static setup (data) {
    let instance = new Application(data)

    Promise.resolve(instance)
      .then(instance.something)
      .then(instance.somethingElse)
      .then(instance.other)
      .then(instance.expressConfig)
      .then(instance.listen)
  }

  something (instance) {
    // Note: use "instance" instead of "this" in these asynchronous startup methods
    // Do something

    const myWorkFunctions = [() => Promise.resolve('foo'), () => Promise.resolve('scum')]

    let promises = myWorkFunctions.map(func => func())

    return Promise.all(promises).then(() => instance)

    // return instance
  }

  somethingElse (instance) {
    let { config } = instance

    // Do something with "config"

    return instance
  }

  expressConfig (instance) {
    app.use(express.static('dist'))
    //app.use(compression())
    //app.use(bodyParser.urlencoded({ extended: false }))
    //app.use(bodyParser.json())
    //app.use(cors({
    //  origin: '*',
    //  methods: ['GET', 'POST', 'DELETE'],
    //  preflightContinue: false
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
Application.setup(some_data)
  .then(() => console.log('Server started successfully'))
  .catch(err => console.error('Something fucked up'))
