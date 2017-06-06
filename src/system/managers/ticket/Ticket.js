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
const Type = require('../../common/Type')

/**
 * Ticket
 * @class
 */
class Ticket extends Type {

  static get typeName () {
    return 'ticket'
  }

  update (data) {
    let { manager, messages, participants, id } = this
    let { message, new_participants, state } = data
    console.log('new_participants', new_participants)

    if (message) {
      messages.push(message)
    }

    if (new_participants) {
      new_participants.forEach(participant => {
        if (participants.indexOf(participant) === -1) {
          participants.push(participant)
        }
      })
    }

    if (state) {
      this.state = state
    }

    return manager.update({ id, doc: { messages, participants, state } })
  }

  reply (data) {
    let { message, user_id, state } = data
    let { manager: { system: { userManager } }, id: ticket_id, participants } = this
    let timestamp = moment().valueOf()

    state = state || 'Open'

    let message_body = {
      timestamp,
      user_id,
      message,
      state
    }

    return this.update({ message: message_body, new_participants: [user_id], state })
      .then(() => userManager.get({ id: participants }))
      .then(users => {
        return Promise.all(users
          // .filter(user => user.id !== user_id)
          .map(user => user.mail({ timestamp, user_id, message, ticket_id, state })))
      })
      .catch(error => Promise.reject(error))
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Ticket
