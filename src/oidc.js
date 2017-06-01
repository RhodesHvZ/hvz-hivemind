'use strict'

/**
 * Dependencies
 * @ignore
 */
const AnvilConnect = require('anvil-connect-nodejs')

/**
 * Module Dependencies
 * @ignore
 */
const Logger = require('./logger')
const Config = require('./config')

/**
 * Logger
 * @ignore
 */
const log = Logger.bootLogger

/**
 * Constants
 * @ignore
 */
const update_time = 3600000 // hourly

/**
 * OIDC
 */
class OIDC {

  constructor () {
    this.anvil = new AnvilConnect(Config.oidc)
  }

  get () {
    let now = new Date()
    if (this.last_update && now.getTime() - update_time < this.last_update.getTime()) {
      return Promise.resolve(this.anvil)
    } else {
      let logObj = {
        now: now.getTime()
      }

      if (this.last_update) {
        logObj.last_update = this.last_update.getTime()
      }

      log.info(logObj, '(Re)initializing OIDC metadata')

      this.last_update = now
      return this.anvil.initProvider()
        .then(() => {
          return this.anvil
        })
    }
  }

  /**
   * init
   *
   * @description
   * Helper middleware for express requests
   */
  init () {
    return (req, res, next) => {
      this.get()
        .then(anvil => req.anvil = anvil)
        .then(() => next())
    }
  }

}

/**
 * Export
 */
module.exports = OIDC
