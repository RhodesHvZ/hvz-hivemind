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
const Manager = require('../../common/Manager')
const User = require('./User')
const Config = require('../../../config')

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
    return ['tokens', 'userinfo', 'achievements']
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
      sysadmin: Config.sysadmin.indexOf(email.toLowerCase()) > -1,
      achievements: [],
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
    let { sub: id, email } = userinfo

    let doc = {
      sysadmin: Config.sysadmin.indexOf(email.toLowerCase()) > -1,
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
    let { req, userinfo: { sub: id } } = data

    log.debug({ id }, 'Assigning session information')
    return this.get({ id })
      .then(user => {
        let { name, email, picture, sysadmin } = user
        Object.assign(req.session, { name, email, picture, sysadmin, sub: id })

        return new Promise((resolve, reject) => {
          req.session.save(error => {
            if (error) {
              return reject(error)
            }
            return resolve(user)
          })
        })
      }).catch(error => Promise.reject(error))
  }

  /**
   * getSysAdmins
   *
   * @description
   * Get user records for system admininstrators
   *
   * @return {Promise<Array<User>>}
   */
  getSysAdmins () {
    return this.search({
      query: {
        term: { sysadmin: true }
      },
      safe: false
    })
  }

  /**
   * mailSysAdmins
   *
   * @description
   * Send or queue push notifications to sysadmins
   *
   * @param  {Object} body - Mail body
   * @return {Promise<Array<Mail>>}
   */
  mailSysAdmins (body) {
    return this.getSysAdmins()
      .then(admins => Promise.all(admins.map(admin => admin.mail(body))))
      .catch(error => Promise.reject(error))
  }
}

/**
 * Export
 * @ignore
 */
module.exports = UserManager
