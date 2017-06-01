'use strict'

/**
 * Dependencies
 */
const session = require('express-session')
const ESStore = require('express-elasticsearch-session')(session)

/**
 * Module Dependencies
 */
const Config = require('../config')

/**
 * ElasticSearch Session Store
 */
const elasticConfig = Config.elasticsearch
const { host, port, index: indexName } = elasticConfig
const store = new ESStore({ host: `http://${host}:${port}`, index: indexName, type: 'session', logLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug' })

/**
 * Export
 */
module.exports = store
