'use strict'

/**
 * Module Dependencies
 * @ignore
 */
const LoggerFactory = require('./LoggerFactory')

/**
 * Constants
 * @ignore
 */
const bootLoggerName = 'boot'
const expressLoggerName = 'request'

/**
 * Logger Registry
 * @class
 *
 * A registry for bunyan loggers
 */
class Logger {

  constructor () {
    this.loggers = {}

    // Boot logger
    this.get({
      name: bootLoggerName,
      db: null
    })
  }

  register (descriptor) {
    let name, logger

    if (typeof descriptor === 'string') {
      name = descriptor
      logger = LoggerFactory.getLogger({ name: descriptor })
    } else if (typeof descriptor === 'object') {
      name = descriptor.name
      logger = LoggerFactory.getLogger(descriptor)
    }

    if (name && logger) {
      this.loggers[name] = logger
      return logger
    } else {
      return null
    }
  }

  get (descriptor) {
    let name

    if (typeof descriptor === 'string') {
      name = descriptor
    } else if (typeof descriptor === 'object') {
      name = descriptor.name
    }

    let logger = this.loggers[name]

    if (logger) {
      return logger
    } else {
      return this.register(descriptor)
    }
  }

  get bootLogger () {
    return this.get(bootLoggerName)
  }

  get expressLogger () {
    return this.get({
      name: expressLoggerName,
      express: true
    })
  }

}

/**
 * Export
 */
module.exports = new Logger()
