'use strict'

/**
 * Dependencies
 * @ignore
 */
const cwd = process.cwd()
const fs = require('fs')
const path = require('path')
const bunyan = require('bunyan')
const expressBunyan = require('express-bunyan-logger')

/**
 * Module Dependencies
 * @ignore
 */
const LogStashLogStream = require('./streams/LogStashLogStream')

/**
 * Constants
 * @ignore
 */
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
const logDir = 'logs'

/**
 * LoggerFactory
 *
 * @class
 * A helper class for creating bunyan loggers
 */
class LoggerFactory {

  static getLogger (descriptor) {
    let {db, file} = descriptor

    if (db === undefined || (db !== null && db !== false)) {
      descriptor.db = logDir
    }

    if (file === undefined || (file !== null && file !== false)) {
      descriptor.file = true
    }

    let config = LoggerFactory.getLoggerConfig(descriptor)

    if (config) {
      if (descriptor.express) {
        return expressBunyan(config)
      } else {
        return bunyan.createLogger(config)
      }
    } else {
      return null
    }
  }

  static createDirectory (dir) {
    try {
      fs.mkdirSync(dir)
    } catch (e) {}
  }

  static getLoggerConfig (descriptor) {
    let {name, db, file} = descriptor

    if (!name) {

      return null
    }

    let config = {
      name,
      streams: [
        {
          level,
          stream: process.stdout
        }
      ]
    }

    if (db) {
      config.streams.push({
        level,
        type: 'raw',
        stream: LogStashLogStream([name])
      })
    }

    if (file) {
      LoggerFactory.createDirectory(path.join(cwd, logDir))
      LoggerFactory.createDirectory(path.join(cwd, logDir, name))

      config.streams.push({
        type: 'rotating-file',
        level,
        path: path.join(cwd, logDir, name, name + '.log'),
        count: 3,
        period: '1d'
      })
    }

    return config
  }
}

/**
 * Export
 */
module.exports = LoggerFactory
