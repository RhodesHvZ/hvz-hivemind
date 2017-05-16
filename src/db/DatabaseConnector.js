'use strict'

/**
 * Dependencies
 * @ignore
 */
const elastic = require('elasticsearch')

/**
 * Module Dependencies
 * @ignore
 */
const Config = require('../config')
const Logger = require('../logger')

/**
 * Constants
 * @ignore
 */
const { elasticsearch: dbhost } = Config
const { host, port } = dbhost

/**
 * Logger
 * @ignore
 */
const log = Logger.bootLogger

function BunyanESLogger (config) {
  this.error = log.error.bind(log)
  this.warning = log.warn.bind(log)
  this.info = log.info.bind(log)
  this.debug = log.debug.bind(log)
  this.trace = function (method, reqUrl, body, resBody, resStatus) {
    log.trace({
      method,
      reqUrl,
      body,
      resBody,
      resStatus
    })
  }
  this.close = function () {}
}

/**
 * Database Connector
 *
 * @class
 * Database connection helper class
 */
class DatabaseConnector {

  static connect (req, res, next) {
    req.esclient = DatabaseConnector.connection()
    return next()
  }

  static connection () {
    return new elastic.Client({ hosts: [`http://${host}:${port}`], log: BunyanESLogger })
  }

}

/**
 * Export
 */
module.exports = DatabaseConnector
