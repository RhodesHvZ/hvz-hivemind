'use strict'

/**
 * Dependencies
 * @ignore
 */
const moment = require('moment')
const _ = require('lodash')

/**
 * Module Dependencies
 * @ignore
 */
const Type = require('../../common/Type')
const PlayerManager = require('../player')
const SquadManager = require('../squad')
const MissionManager = require('../mission')

/**
 * Game
 * @class
 */
class Game extends Type {

  /**
   * constructor
   */
  constructor (manager, data, hidden) {
    super(manager, data, hidden)
    Object.defineProperty(this, 'playerManager', { value: new PlayerManager(manager.system, this) })
    Object.defineProperty(this, 'squadManager', { value: new SquadManager(manager.system, this) })
    Object.defineProperty(this, 'missionManager', { value: new MissionManager(manager.system, this) })
  }

  static get typeName () {
    return 'game'
  }

  get state () {
    let { registration_date, start_date, end_date } = this
    let now = moment()

    if (now.isBefore(moment.utc(registration_date))) {
      return 'new'
    } else if (now.isBefore(moment.utc(start_date))) {
      return 'registration'
    } else if (now.isBefore(moment.utc(end_date))) {
      return 'running'
    } else if (now.isAfter(moment.utc(end_date))) {
      return 'finished'
    } else {
      return 'invalid'
    }
  }

  update (data) {
    let { manager, id } = this
    let { description, background_image, registration_date, start_date, end_date, rules } = data
    let { log } = Game

    if (registration_date) {
      let normalizedRegDate = moment(registration_date)
      registration_date = normalizedRegDate.isValid() ? normalizedRegDate.valueOf() : undefined
    }

    if (start_date) {
      let normalizedStartDate = moment(start_date)
      start_date = normalizedStartDate.isValid() ? normalizedStartDate.valueOf() : undefined
    }

    if (end_date) {
      let normalizedEndDate = moment(end_date)
      end_date = normalizedEndDate.isValid() ? normalizedEndDate.valueOf() : undefined
    }

    let doc = _.omitBy({
      description,
      background_image,
      registration_date,
      start_date,
      end_date,
      rules
    }, value => value === undefined)

    return manager.update({ id, doc })
      .then(result => {
        Object.assign(this, doc)
        log.info({ game: id, update: doc }, 'Game Updated')
        return result
      })
      .catch(error => Promise.reject(error))
  }

  updateAdmin (data) {
    let { manager, id, admins } = this
    let { user_id: uid, rank, revoke } = data
    let { log } = Game

    let adminIdx = admins.findIndex(admin => admin.id === uid)

    // Existing Admin Record Found
    if (adminIdx > -1) {

      // Cannot Modify Owner's Rank
      if (admins[adminIdx].rank === 1) {
        return Promise.reject('Cannot modify game owner rank')
      }

      // Revoke Admin Permission
      if (revoke) {
        admins.splice(adminIdx, 1)

      // Grant Admin Permission
      } else {
        admins[adminIdx].rank = rank
      }

    // Create New Admin Record
    } else if (!revoke) {
      admins.push({ id: uid, rank })
    }

    return manager.update({ id, doc: { admins } })
      .then(result => {
        log.info({ game: id, admins }, 'Game Permissions Updated')
        return result
      })
      .catch(error => Promise.reject(error))
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Game
