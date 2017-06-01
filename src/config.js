'use strict'

/**
 * Dependencies
 */
const _ = require('lodash')
const cwd = process.cwd()
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

/**
 * Module Dependencies
 */
const Logger = require('./logger')

/**
 * Constants
 */
const configDir = 'config'
const configFile = process.env.NODE_ENV === 'production' ? 'production.json' : 'development.json'
const configExampleFile = 'config.example.json'

/**
 * Logger
 */
const log = Logger.bootLogger

/**
 * Config
 *
 * @description
 * Config default values and setup handler
 */
function Config () {
  let config, exampleConfig

  try {
    exampleConfig = require(path.join(cwd, configDir, configExampleFile))
  } catch (err) {
    log.error(`Example configuration missing. Please ensure that \`./${configDir}/${configExampleFile}\' contains the example configuration and restart the process.`)
    process.exit(1)
  }

  try {
    config = require(path.join(cwd, configDir, configFile))
  } catch (err) { }

  if (!config) {
    let newConfig = Object.assign({}, exampleConfig)
    newConfig.secrets.session = generateSessionSecret()

    fs.writeFileSync(path.join(cwd, configDir, configFile), JSON.stringify(newConfig, null, 2))
    log.warn(`No config detected. Default config generated at \`./${configDir}/${configFile}\'. Please make changes where necessary and restart the process.`)
    process.exit(0)
  } else {
    return _.assign({}, _.merge(exampleConfig, config))
  }
}

function generateSessionSecret () {
  const buf = crypto.randomBytes(32)
  return buf.toString('base64')
}

/**
 * Export
 */
module.exports = Config()
