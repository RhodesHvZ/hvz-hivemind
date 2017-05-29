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
   * unsafeFields
   */
  static get unsafeFields () {
    return ['tokens', 'userinfo', 'mailbox', 'achievements']
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
        return this.updateUserAuth(event)
      } else {
        return this.registerUser(event)
      }
    })
    .then(() => this.sessionUserAuth(event))
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
   * updateUserAuth
   *
   * @description
   * Process user login
   *
   * @param {data}
   *
   * @return {Promise}
   */
  updateUserAuth (data) {
    let { log } = UserManager
    let { userinfo, tokens, req } = data
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
   * sessionUserAuth
   *
   * @description
   * Assign user data to session following login/registration
   *
   * @param  {Object} data
   * @return {Promise}
   */
  sessionUserAuth (data) {
    let { log } = UserManager
    let { req, userinfo: { sub } } = data

    log.debug({ id: sub }, 'Assigning session information')
    return this.getUser(sub)
      .then(user => {
        let { name, email, picture } = user
        Object.assign(req.session, { name, email, picture, sub })
        req.session.save()
        return user
      }).catch(error => Promise.reject(error))
  }

  /**
   * updateUser
   *
   * @description
   * Update a users details
   *
   * @param  {String} id
   * @param  {Object} data
   * @return {Promise}
   */
  updateUser (id, data) {
    let { log } = UserManager
    let { name, email, picture } = data

    let doc = {
      name,
      email,
      picture,
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
   * @param  {Boolean} safe - include sensitive information
   * @return {User}
   */
  getUser (id, safe=false) {
    return this.get({ id, safe })
      .then(response => {
        return User.fromResponse(this, response)
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * searchUser
   *
   * @description
   * Search for users
   *
   * @param  {Object}  query
   * @param  {Boolean} safe - include sensitive information
   * @return {Array<User>}
   */
  searchUser (query, safe=false) {
    let { log } = UserManager

    return this.search({ query, safe })
      .then(response => {
        return User.fromResponse(this, response)
      })
      .catch(error => {
        log.error(error)
        return Promise.reject(error)
      })
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserManager
