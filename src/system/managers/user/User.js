'use strict'

/**
 * Dependencies
 * @ignore
 */
const _ = require('lodash')

/**
 * Module Dependencies
 * @ignore
 */
const Type = require('../../common/Type')
const MailManager = require('../mail')

/**
 * User
 * @class
 */
class User extends Type {

  /**
   * constructor
   */
  constructor (manager, data, hidden) {
    super(manager, data, hidden)
    Object.defineProperty(this, 'mailManager', { value: new MailManager(manager.system, this) })
  }

  static get typeName () {
    return 'user'
  }

  get socket () {
    let { manager: { system: { socketManager } }, id } = this
    return socketManager.getSocket(id)
  }

  update (data) {
    let { log } = User
    let { name, email, picture } = data
    let { id, manager } = this

    let doc = _.omitBy({
      name,
      email,
      picture
    }, value => value === undefined)

    log.info({ id }, 'Updating user')
    return manager.update({ id, doc })
      .then(res => {
        Object.assign(this, doc)
        return res
      })
      .catch(error => Promise.reject(error))
  }

  updateSession (session) {
    let { name, email, picture, id, sysadmin } = this
    let { sub: suid } = session

    if (id !== suid) {
      return Promise.reject('User session mismatch')
    }

    Object.assign(session, { name, email, picture, sysadmin })
    return new Promise((resolve, reject) => session.save(error => {
      if (error) {
        return reject(error)
      }
      return resolve(this)
    }))
  }

  mail (body) {
    let { mailManager } = this
    return mailManager.mail(body)
  }

  privateMessage (data) {
    let { mailManager } = this
    return mailManager.privateMessage(data)
  }

}

/**
 * Export
 * @ignore
 */
module.exports = User
