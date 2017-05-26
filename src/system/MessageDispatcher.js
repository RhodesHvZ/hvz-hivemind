'use static'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const InvalidRequest = require('./handlers/InvalidRequest')
const HeartbeatRequest = require('./handlers/HeartbeatRequest')

/**
 * Handler Type Mapping
 * @ignore
 */
const mapping = {
  // DEBUG / SYSTEM HEALTH
  HEARTBEAT: require('./handlers/HeartbeatRequest'),

  // USER
  USER_GET: require('./handlers/user/GetUserRequest'),

  // GAME
  GAME_NEW: require('./handlers/game/NewGameRequest'),
}

/**
 * MessageDispatcher
 * @class
 */
class MessageDispatcher {

  static handle (request, socket, system) {
    if (!request) {
      return InvalidRequest.handle(request, socket, system, 'Request not present')
    }

    let { type } = request

    if (!type) {
      return InvalidRequest.handle(request, socket, system, 'Request requires a type')
    }

    let handler = mapping[type]

    if (!handler) {
      return InvalidRequest.handle(request, socket, system, `${type} does not exist`)
    }

    return handler.handle(request, socket, system)
  }

}

/**
 * Export
 * @ignore
 */
module.exports = MessageDispatcher
