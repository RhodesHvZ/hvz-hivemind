'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Store = require('./common/Store')
const SystemReducer = require('./SystemReducer')

/**
 * Managers
 * @ignore
 */
const SocketManager = require('./SocketManager')
const GameManager = require('./managers/game')
const UserManager = require('./managers/user')
const TicketManager = require('./managers/ticket')
const AchievementManager = require('./managers/achievement')

/**
 * Game Manager
 * @class
 */
class SystemManager extends Store {

  /**
   * constructor
   */
  constructor (server) {
    super()
    this.server = server
    this.socketManager = new SocketManager(this)
    this.gameManager = new GameManager(this)
    this.userManager = new UserManager(this)
    this.ticketManager = new TicketManager(this)
    this.achievementManager = new AchievementManager(this)
  }

  /**
   * reducers
   */
  static get reducer () {
    return SystemReducer
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SystemManager
