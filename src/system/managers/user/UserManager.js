'use strict'

/**
 * Dependencies
 * @ignore
 */
const moment = require('moment')

/**
 * Module Dependencies
 * @ignore
 */
const Events = require('../../events')
const SocketEventEnum = require('../../../../common/SocketEventEnum')
const Manager = require('../../common/Manager')
const UserReducer = require('./UserReducer')
const User = require('./User')

/**
 * User Manager
 * @class
 *
 * Maintain user state and handle user events
 */
class UserManager extends Manager {

  /**
   * constructor
   */
  constructor (system) {
    super(system)
    Events.on(Events.eventList.USER_AUTH, event => this.handleUserAuth(event))
  }

  /**
   * type
   */
  static get type () {
    return User
  }

  /**
   * handleUserAuth
   *
   * @description
   * Handle user authentication
   *
   * @param  {Object} event
   * @return {Promise}
   */
  handleUserAuth (event) {
    let { userinfo: { sub: id } } = event
    let { log } = UserManager

    return this.exists({ id }).then(exists => {
      if (exists) {
        return this.updateUser(event)
      } else {
        return this.registerUser(event)
      }
    })
    .then(() => log.debug('User auth handled'))
    .catch(error => log.error(error))
  }

  /**
   * registerUser
   *
   * @description
   * Register new user
   *
   * @param  {Object} data
   * @return {Promise}
   */
  registerUser (data) {
    let { client, log, meta: { index, type } } = UserManager
    let { userinfo, tokens } = data
    let { sub: id, name, picture, email } = userinfo

    let body = {
      tokens,
      userinfo,
      updated_at: moment().valueOf(),
      name,
      picture,
      email,
      id,
      achievements: [],
      mailbox: []
    }

    log.debug({ id }, 'Registering new user')
    return this.store({ id, body })
  }

  /**
   * updateUser
   *
   * @description
   * Process user login
   *
   * @param {data}
   *
   * @return {Promise}
   */
  updateUser (data) {
    let { log } = UserManager
    let { userinfo, tokens } = data
    let { sub: id } = userinfo

    let doc = {
      tokens,
      userinfo,
      updated_at: moment().valueOf()
    }

    log.debug({ id }, 'Updating existing user')
    return this.update({ id, doc })
  }

  /**
   * getUser
   *
   * @description
   * Get a user by the user id
   *
   * @param  {String} id
   * @return {User}
   */
  getUser (id) {
    return this.get({ id })
      .then(response => {
        return User.fromResponse(this, response)
      })
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserManager
