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
const MarkerManager = require('../marker')
const GameAdminRankEnum = require('./GameAdminRankEnum')

/**
 * Game State Constants
 */
const NEW = 'New'
const REGISTRATION = 'Registration'
const RUNNING = 'Running'
const FINISHED = 'Finished'
const states = {
  NEW,
  REGISTRATION,
  RUNNING,
  FINISHED
}

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
    Object.defineProperty(this, 'markerManager', { value: new MarkerManager(manager.system, this) })
  }

  static get typeName () {
    return 'game'
  }

  static get states () {
    return states
  }

  get states () {
    return states
  }

  get state () {
    let { registration_date, start_date, end_date } = this
    let now = moment()

    if (now.isBefore(moment.utc(registration_date))) {
      return 'New'
    } else if (now.isBefore(moment.utc(start_date))) {
      return 'Registration'
    } else if (now.isBefore(moment.utc(end_date))) {
      return 'Running'
    } else if (now.isAfter(moment.utc(end_date))) {
      return 'Finished'
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

    let adminIdx = admins.findIndex(admin => admin.user_id === uid)

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
      admins.push({ user_id: uid, rank })
    }

    return manager.update({ id, doc: { admins } })
      .then(result => {
        log.info({ game: id, admins }, 'Game Permissions Updated')
        return result
      })
      .catch(error => Promise.reject(error))
  }

  transferOwnership (data) {
    let { manager, id, admins } = this
    let { user_id: uid } = data
    let { log } = Game

    let adminIdx = admins.findIndex(admin => admin.user_id === uid)
    let ownerIdx = admins.findIndex(admin => admin.rank === GameAdminRankEnum.OWNER)

    // Create or Update Admin Record
    if (adminIdx > -1) {
      admins[adminIdx].rank = GameAdminRankEnum.OWNER
    } else {
      admins.push({ user_id: uid, rank: GameAdminRankEnum.OWNER })
    }

    // Owner Admin Record *WILL* Exist
    admins[ownerIdx].rank = GameAdminRankEnum.SUPER

    return manager.update({ id, doc: { admins } })
      .then(result => {
        log.info({ game: id, admins }, 'Game Ownership Transferred')
        return result
      })
      .catch(error => Promise.reject(error))
  }

  getGameAdmins () {
    let { manager: { system: { userManager } }, admins } = this
    let id = admins.map(admin => admin.id)

    return userManager.get({ id, safe: true })
  }

  mailGameAdmins (body) {
    return this.getGameAdmins()
      .then(admins => Promise.all(admins.map(admin => admin.mail(body))))
      .catch(error => Promise.reject(error))
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Game
