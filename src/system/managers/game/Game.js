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

  update (data) {
    if (!data) {
      return Promise.reject('data is required')
    }

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
