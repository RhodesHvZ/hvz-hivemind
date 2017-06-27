'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'

/**
 * Notification
 */
export default function (data) {
  let { timestamp, data: { ticket_id, game_id, user_id, subject, message } } = data

  return (actions, state) => {
    let { users } = state
    let user = users[user_id]

    if (!user) {
      actions.GetUserAction(user_id)
      return null
    }

    return {
      title: `New Ticket from ${user.name}`,
      icon: 'placeholder.png',
      text: subject,
      action: () => window.location.hash = `ticket/${ticket_id}`
    }
  }
}
