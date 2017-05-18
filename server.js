'use strict'

/**
 * Dependencies
 * @ignore
 */
const express = require('express')
const http = require('http')
const session = require('express-session')
const sharedSession = require('express-socket.io-session')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')

/**
 * Module Dependencies
 * @ignore
 */
const pkg = require('./package.json')
const Config = require('./src/config')
const Store = require('./src/db/Session')
const SystemManager = require('./src/system')
const DatabaseConnector = require('./src/db')
const HvZIndexSchema = require('./elasticsearch/HvZIndexSchema.json')

/**
 * App
 * @ignore
 */
const app = express()
const server = http.Server(app)

/**
 * Logger
 * @ignore
 */
const log = require('./src/logger').bootLogger

/**
 * Application
 * @class
 */
class Application {

  constructor (data) {
    this.systemManager = new SystemManager(server)
  }

  static setup (data) {
    let instance = new Application(data)

    return Promise.resolve(instance)
      .then(instance.dbConfig)
      .then(instance.expressConfig)
      .then(instance.listen)
  }

  dbConfig (instance) {
    let { elasticsearch: { index: indexName } } = Config
    let client = DatabaseConnector.connection()

    log.debug({ schema: HvZIndexSchema }, 'ElasticSearch Index Schema for HvZ')

    return new Promise((resolve, reject) => {
      client.indices.exists({ index: indexName }, (err, exists) => {
        if (err) {
          return reject(err)
        }

        if (exists) {
          log.info('HvZ ElasticSearch Index Found')
          return resolve()
        }

        client.indices.create({ index: indexName, body: HvZIndexSchema }, (err, response) => {
          if (err) {
            return reject(err)
          }

          let { statusCode } = response

          if (statusCode >= 400) {
            log.fatal({ response }, 'Failed to Create Index')
            return reject('Failed to Create Index')
          }

          log.debug({ response }, 'HvZ Index Created')
          return resolve(response)
        })
      })
    }).then(() => instance)
  }

  expressConfig (instance) {
    app.use(compression())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    //app.use(cors({
      //origin: '*',
      //methods: ['GET', 'POST', 'DELETE'],
      //preflightContinue: false
    //}))

    app.set('json spaces', 2)

    let { secrets: { session: sessionSecret } } = Config

    let sessionMiddleware = session({
      secret: sessionSecret,
      cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      },
      store: Store,
      resave: true,
      saveUninitialized: true
    })

    app.use(sessionMiddleware)
    app.use(DatabaseConnector.connect)

    let { socketManager: { io } } = instance.systemManager

    io.use(sharedSession(sessionMiddleware, {
      autoSave: true
    }))

    // io.use((socket, next) => {
    //   DatabaseConnector.connect(socket.request, socket.request.res, next)
    // })

    app.use(express.static('dist'))

    return instance
  }

  listen (instance) {
    server.listen(process.env.PORT || 3000, () => {
      log.info(`Listening on port ${process.env.PORT || 3000}`)
    })
  }
}

/**
 * Start
 * @ignore
 */
Application.setup({})
  .then(() => log.info('Server started successfully'))
  .catch(error => log.fatal({ error }, `Error starting server`))
