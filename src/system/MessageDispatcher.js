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
  USER_GET: require('./handlers/user/UserGetRequest'),
  USER_UPDATE: require('./handlers/user/UserUpdateRequest'),
  USER_MESSAGE: require('./handlers/user/UserMessageRequest'),
  USER_GET_MAIL: require('./handlers/user/UserGetMailRequest'),

  // GAME
  GAME_NEW: require('./handlers/game/GameCreateRequest'),
  GAME_GET: require('./handlers/game/GameGetRequest'),
  GAME_UPDATE: require('./handlers/game/GameUpdateRequest'),
  GAME_PERMISSION_UPDATE: require('./handlers/game/GameUpdatePermissionRequest'),
  GAME_TRANSFER_OWNERSHIP: require('./handlers/game/GameTransferOwnershipRequest'),

  // PLAYER
  PLAYER_REGISTER: require('./handlers/player/PlayerRegisterRequest'),
  PLAYER_GET: require('./handlers/player/PlayerGetRequest'),
  PLAYER_ACTIVATE: require('./handlers/player/PlayerActivateRequest'),
  PLAYER_DEACTIVATE: require('./handlers/player/PlayerDeactivateRequest'),
  PLAYER_SUSPEND: require('./handlers/player/PlayerSuspendRequest'),
  PLAYER_KILL: require('./handlers/player/PlayerKillRequest'),
  PLAYER_REVIVE: require('./handlers/player/PlayerReviveRequest'),
  PLAYER_SUPERSTATE: require('./handlers/player/PlayerSuperStateRequest'),
  PLAYER_UPDATE: require('./handlers/player/PlayerUpdateRequest'),
  PLAYER_TAG: require('./handlers/player/PlayerTagRequest'),

  // TICKET
  TICKET_NEW: require('./handlers/ticket/TicketCreateRequest'),
  TICKET_GET: require('./handlers/ticket/TicketGetRequest'),
  TICKET_REPLY: require('./handlers/ticket/TicketReplyRequest'),
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
