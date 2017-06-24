'use strict'

/**
 * Dependencies
 * @ignore
 */
const _ = require('lodash')
const moment = require('moment')

/**
 * Module Dependencies
 * @ignore
 */
const Type = require('../../common/Type')
const WordList = require('../../common/WordList')

/**
 * Player Event Constants
 */
const REGISTER = 'REGISTER'
const ACTIVATE = 'ACTIVATE'
const DEACTIVATE = 'DEACTIVATE'
const SUSPEND = 'SUSPEND'

/**
 * Player State Constants
 */
const ACTIVE = 'Active'
const INACTIVE = 'Inactive'
const SUSPENDED = 'Suspended'
const player_states = {
  ACTIVE,
  INACTIVE,
  SUSPENDED,
}

/**
 * Game Event Constants
 */
const TAG = 'TAG'
const TAGGED = 'TAGGED'
const KILL = 'KILL'
const REVIVE = 'REVIVE'
const SUPERSTATE = 'SUPERSTATE'
const REMOVE_SUPERSTATE = 'REMOVE_SUPERSTATE'

/**
 * Game State Constants
 */
const HUMAN = 'Human'
const ZOMBIE = 'Zombie'
const game_states = {
  HUMAN,
  ZOMBIE,
}

/**
 * Player
 * @class
 */
class Player extends Type {

  static get typeName () {
    return 'player'
  }

  static get player_states () {
    return player_states
  }

  static get game_states () {
    return game_states
  }

  get player_states () {
    return player_states
  }

  get game_states () {
    return game_states
  }

  get player_state () {
    let { player_events } = this

    return player_events.reduce((state, event) => {
      let { type, data } = event

      if (type === ACTIVATE) {
        return ACTIVE
      } else if (type === DEACTIVATE) {
        return INACTIVE
      } else if (type === SUSPEND && moment().isBefore(moment.utc(data.until))) {
        return SUSPENDED
      }

      return state
    }, 'Inactive')
  }

  get game_state () {
    let { game_events } = this

    return game_events.reduce((state, event) => {
      let { type, data } = event

      if (type === TAGGED && state === HUMAN) {
        return ZOMBIE
      } else if (type === KILL) {
        return ZOMBIE
      } else if (type === REVIVE && state === ZOMBIE) {
        return HUMAN
      }

      return state
    }, HUMAN)
  }

  get super_state () {
    let { game_events } = this

    return game_events.reduce((state, event) => {
      let { type, data } = event

      if (type === SUPERSTATE) {
        let { super_state } = data
        state.push(super_state)
      } else if (type === REMOVE_SUPERSTATE) {
        let { super_state } = data
        let idx = state.indexOf(super_state)

        if (idx !== -1) {
          state.splice(idx, 1)
        }
      }

      return state
    }, [])
  }

  getUser () {
    if (this._user) {
      return Promise.resolve(this._user)
    }

    let { manager: { system: { userManager } }, user_id } = this

    return userManager.get({ id: user_id })
      .then(user => {
        Object.defineProperty(this, '_user', { value: user })
        return user
      })
      .catch(error => Promise.reject(error))
  }

  pushGameEvent (event) {
    let { manager, id, game_events } = this
    game_events.push(event)

    return manager.update({ id, doc: { game_events } })
  }

  pushPlayerEvent (event) {
    let { manager, id, player_events } = this
    player_events.push(event)

    return manager.update({ id, doc: { player_events } })
  }

  activate (data) {
    let { admin, timestamp } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    return this.pushPlayerEvent({
      type: ACTIVATE,
      data: { admin, timestamp }
    })
  }

  deactivate (data) {
    let { admin, timestamp } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    return this.pushPlayerEvent({
      type: DEACTIVATE,
      data: { admin, timestamp }
    })
  }

  suspend (data) {
    let { admin, timestamp, until, reason } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    if (!until) {
      return Promise.reject('Suspension requires until')
    }

    return this.pushPlayerEvent({
      type: SUSPEND,
      data: _.omitBy({ admin, timestamp, until, reason }, value => value === undefined)
    })
  }

  kill (data) {
    let { admin, timestamp, reason } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    return this.pushGameEvent({
      type: KILL,
      data: _.omitBy({ admin, timestamp, reason }, value => value === undefined)
    })
  }

  revive (data) {
    let { admin, timestamp, reason } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    return this.pushGameEvent({
      type: REVIVE,
      data: _.omitBy({ admin, timestamp, reason }, value => value === undefined)
    })
  }

  tag (data) {
    let { victim, lat, lon, note } = data
    let timestamp = moment().valueOf()

    let tag_body = {
      timestamp,
      type: 'TAG',
      data: {
        victim: victim.id,
        position: { lat, lon },
        note
      }
    }

    let tagged_body = {
      timestamp,
      type: 'TAGGED',
      data: {
        killer: this.id,
        position: { lat, lon },
        note
      }
    }

    return this.pushGameEvent(tag_body)
      .then(() => victim.pushGameEvent(tagged_body))
      .then(() => victim.getUser())
      .then(user => {
        let { mailManager } = user
        return mailManager.mail(tagged_body)
      })
      .then(() => this)
      .catch(error => Promise.reject(error))
  }

  addSuperState (data) {
    let { admin, timestamp, super_state } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    return this.pushGameEvent({
      type: SUPERSTATE,
      data: { admin, timestamp, super_state }
    })
  }

  removeSuperState (data) {
    let { admin, timestamp, super_state } = data

    if (!timestamp) {
      timestamp = moment().valueOf()
    }

    return this.pushGameEvent({
      type: REMOVE_SUPERSTATE,
      data: { admin, timestamp, super_state }
    })
  }

  refreshBiteCode () {
    let { manager: playerManager, id } = this

    let ensureCodeUnique = (code) => {
      return playerManager.codeUnique(body.code)
        .then(unique => {
          if (!unique) {
            return ensureCodeUnique(WordList.generateBiteCode())
          } else {
            return code
          }
        })
        .catch(error => Promise.reject(error))
    }

    return ensureCodeUnique(WordList.generateBiteCode())
      .then(code => {
        this.code = code
        return playerManager.update({ id, doc: { code } })
      })
      .catch(error => Promise.reject(error))
  }

  privateMessage(data) {
    return this.getUser()
      .then(user => user.privateMessage(data))
      .catch(error => Promise.reject(error))
  }

  update (data) {
    let { display_name, last_words, picture } = data
    let { manager, id } = this
    let { log } = Player
    let doc = _.omitBy({
      display_name,
      last_words,
      picture
    }, value => value === undefined)

    return manager.update({ id, doc })
      .then(result => {
        Object.assign(this, doc)
        log.info({ player: id, update: doc }, 'Player Updated')
        return result
      })
      .catch(error => Promise.reject(error))
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Player
