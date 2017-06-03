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

/**
 * User
 * @class
 */
class User extends Type {

  static get typeName () {
    return 'user'
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
    let { name, email, picture, id } = this
    let { sub: suid } = session

    if (id !== suid) {
      return Promise.reject('User session mismatch')
    }

    Object.assign(session, { name, email, picture })
    return new Promise((resolve, reject) => session.save(error => {
      if (error) {
        return reject(error)
      }
      return resolve(this)
    }))
  }

}

/**
 * Export
 * @ignore
 */
module.exports = User
