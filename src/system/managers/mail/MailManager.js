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
const Mail = require('./Mail')

/**
 * Mail Type Constants
 */
const PRIVATE_MESSAGE = 'PRIVATE_MESSAGE'
const mail_types = {
  PRIVATE_MESSAGE,
}

/**
 * Query Constants
 */
const MAX_MAIL = 10

/**
 * Mail Manager
 * @class
 */
class MailManager extends Manager {

  /**
   * constructor
   */
  constructor (system, user) {
    super(system)
    this.user = user
  }

  static get type () {
    return Mail
  }

  static get unsafeFields () {
    return []
  }

  privateMessage (data) {
    let { message, sender: sender_id } = data
    let { user: { id: user_id, socket } } = this

    if (!sender_id) {
      sender_id = 'SYSTEM'
    }

    let body = {
      user_id,
      delivered: false,
      timestamp: moment().valueOf(),
      type: PRIVATE_MESSAGE,
      data: { message, sender_id }
    }

    if (socket) {
      socket.emit('message', {
        timestamp: moment(),
        type: 'MAIL',
        data: body
      })
      body.delivered = true
    }

    return this.store({ body })
      .then(response => {
        let { _id: id } = response
        body.id = id
        return new Mail(this, body)
      })
      .catch(error => Promise.reject(error))
  }

  getMessages (data) {
    let { user: { id: user_id } } = this
    let { page=0 } = data

    return this.search({
      query: {
        match: { user_id }
      },
      sort: [
        { delivered: { order: 'asc' } },
        { timestamp: { order: 'desc' } },
        '_score'
      ],
      from: page * MAX_MAIL,
      size: MAX_MAIL,
      safe: true
    })
  }
}

/**
 * Export
 * @ignore
 */
module.exports = MailManager
