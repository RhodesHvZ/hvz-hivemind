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
const OIDC = require('./src/oidc')
const Logger = require('./src/logger')
const Events = require('./src/system/events')
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
const log = Logger.bootLogger

/**
 * PARAMS
 * @ignore
 */
const PARAMS = { 'GET': 'query', 'POST': 'body' }

/**
 * Application
 * @class
 */
class Application {

  constructor () {
    this.systemManager = new SystemManager(server)
  }

  static setup () {
    let instance = new Application()

    return Promise.resolve(instance)
      .then(instance.testDbConnection)
      .then(instance.dbConfig)
      .then(instance.debugClearSessions)
      .then(instance.expressConfig)
      .then(instance.oidc)
      .then(instance.listen)
  }

  testDbConnection (instance) {
    let client = DatabaseConnector.connection()

    return client.ping()
      .then(() => log.info('ElasticSearch Connected'))
      .catch(error => {
        log.error('ElasticSearch Connection Error')
        return Promise.reject(error)
      })
      .then(() => instance)
  }

  dbConfig (instance) {
    let { elasticsearch: { index: indexName } } = Config
    let client = DatabaseConnector.connection()

    log.debug({ schema: HvZIndexSchema }, 'ElasticSearch Index Schema for HvZ')

    return client.indices.exists({ index: indexName })
      .then(exists => {
        if (!exists) {
          return client.indices.create({ index: indexName, body: HvZIndexSchema })
            .then(response => log.debug({ response }, 'HvZ Index Created'))
        } else {
          log.info('HvZ ElasticSearch Index Found')
        }
      })
      .catch(error => {
        log.fatal({ response }, 'Failed to Create Index')
        return Promise.reject('Failed to Create Index')
      })
      .then(() => instance)
  }

  debugClearSessions (instance) {
    let { elasticsearch: { index: indexName } } = Config
    let client = DatabaseConnector.connection()

    if (false && process.env.NODE_ENV !== 'production') {
      return client.deleteByQuery({
        index: indexName,
        type: 'session',
        body: {
          query: {
            match_all: {}
          }
        }
      }).then(response => {
        log.debug({ response }, 'Cleared Session Cache')
        return instance
      }).catch(error => Promise.reject(error))
    }

    return instance
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

    // app.use(Logger.expressLogger)

    app.set('json spaces', 2)

    let { secrets: { session: sessionSecret } } = Config

    let sessionMiddleware = session({
      secret: sessionSecret,
      cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
      },
      store: Store,
      resave: false,
      saveUninitialized: true
    })

    app.use(sessionMiddleware)
    app.use(DatabaseConnector.connect)

    let { socketManager: { io } } = instance.systemManager

    io.use(sharedSession(sessionMiddleware))

    // io.use((socket, next) => {
    //   DatabaseConnector.connect(socket.request, socket.request.res, next)
    // })

    app.use(express.static('dist'))

    return instance
  }

  oidc (instance) {
    let anvil = new OIDC()
    let client = DatabaseConnector.connection()
    app.use(anvil.init())

    function loginCallbackMiddleware (req, res) {
      let { anvil } = req
      let params = Object.assign(req.params || {}, req[PARAMS[req.method]] || {})

      if (params && params.code) {
        return anvil.token({ code: params.code })
          .then(tokens => {
            req.tokens = tokens
            return anvil.userInfo({ token: tokens.access_token })
          })
          .then(userinfo => {
            Events.USER_AUTH({ tokens: req.tokens, userinfo, req })
            res.redirect('/')
          })
          .catch(error => res.status(400).json(error))
      } else {
        res.status(400).json({ error: 'invalid authorization code' })
      }
    }

    app.get('/login', (req, res) => {
      let { anvil } = req
      res.redirect(anvil.authorizationUri())
    })

    app.get('/login/callback', loginCallbackMiddleware)
    app.post('/login/callback', loginCallbackMiddleware)

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
  .catch(error => {
    log.fatal({ error }, `Error starting server`)
    process.exit(1)
  })
