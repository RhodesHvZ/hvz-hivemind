'use strict'

/**
 * Dependencies
 * @ignore
 */
const bunyanLogStash = require('bunyan-logstash-tcp')

/**
 * Module Dependencies
 * @ignore
 */
const Config = require('../../config')
const Logger = require('../Logger')


/**
 * Logger
 */
const log = Logger.bootLogger

/**
 * ElasticSearch LogStash Log Stream
 */
function createStream (tags=['hvz']) {
  let { logstash: { host, port } } = Config
  return bunyanLogStash.createStream({ host, port, tags })
}

/**
 * Export
 */
module.exports = createStream
