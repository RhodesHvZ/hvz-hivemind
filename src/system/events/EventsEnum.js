'use strict'

/**
 * Export
 */
module.exports = {
  /**
   * System Management
   */
  SYSTEM_CONFIG_UPDATE: 'SYSTEM_CONFIG_UPDATE',
  SYSTEM_NEW_ADMIN: 'SYSTEM_NEW_ADMIN',
  SYSTEM_NEW_MAIL: 'SYSTEM_NEW_MAIL',

  /**
   * User Management
   */
  USER_AUTH: 'USER_AUTH',
  USER_REGISTERED: 'USER_REGISTERED',
  USER_UPDATE: 'USER_UPDATE',
  USER_ACHIEVEMENT_GET: 'USER_ACHIEVEMENT_GET',
  USER_DELETE: 'USER_DELETE',
  USER_DEACTIVATE: 'USER_DEACTIVATE',
  USER_STREAM_START: 'USER_STREAM_START',

  /**
   * Game Management
   */
  GAME_CONFIG_UPDATE: 'GAME_CONFIG_UPDATE',
  GAME_NEW_ADMIN: 'GAME_NEW_ADMIN',
  GAME_OPEN: 'GAME_OPEN',
  GAME_CLOSE: 'GAME_CLOSE',
  GAME_START: 'GAME_START',
  GAME_END: 'GAME_END',
  GAME_NEW_ANNOUNCE: 'GAME_NEW_ANNOUNCE',
  GAME_NEW_ADMIN_MAIL: 'GAME_NEW_ADMIN_MAIL',
  GAME_UPDATE: 'GAME_UPDATE',
  GAME_DELETE: 'GAME_DELETE',
  GAME_INACTIVE: 'GAME_INACTIVE',
  GAME_STREAM_START: 'GAME_STREAM_START',

  /**
   * Player Management
   */
  PLAYER_REGISTERED: 'PLAYER_REGISTERED',
  PLAYER_VERIFIED: 'PLAYER_VERIFIED',
  PLAYER_ACTIVATE: 'PLAYER_ACTIVATE',
  PLAYER_DEACTIVATE: 'PLAYER_DEACTIVATE',
  PLAYER_SUSPEND: 'PLAYER_SUSPEND',
  PLAYER_UPDATE: 'PLAYER_UPDATE',
  PLAYER_DELETE: 'PLAYER_DELETE',
  PLAYER_NEW_MAIL: 'PLAYER_NEW_MAIL',
  PLAYER_TAG: 'PLAYER_TAG', // For system. Dispatches KILL and DIE.
  PLAYER_MISSION_OBJECTIVE: 'PLAYER_MISSION_OBJECTIVE',
  PLAYER_SOS: 'PLAYER_SOS',
  PLAYER_REVIVE: 'PLAYER_REVIVE',
  PLAYER_KILL: 'PLAYER_KILL', // For killer
  PLAYER_DIE: 'PLAYER_DIE', // For victim

  /**
   * Squad Management
   */
  SQUAD_CREATE: 'SQUAD_CREATE',
  SQUAD_INVITE: 'SQUAD_INVITE',
  SQUAD_JOIN: 'SQUAD_JOIN',
  SQUAD_UPDATE: 'SQUAD_UPDATE',
  SQUAD_DELETE: 'SQUAD_DELETE',
  SQUAD_PROMOTE: 'SQUAD_PROMOTE',
  SQUAD_INACTIVE: 'SQUAD_INACTIVE',
  SQUAD_MEMBER_SOS: 'SQUAD_MEMBER_SOS',
  SQUAD_NEW_MAIL: 'SQUAD_NEW_MAIL',

  /**
   * Chat Management
   */
  CHAT_NEW_MESSAGE: 'CHAT_NEW_MESSAGE',
  CHAT_NEW_DISCORD_MESSAGE: 'CHAT_NEW_DISCORD_MESSAGE',
  CHAT_NEW_COMMAND: 'CHAT_NEW_COMMAND',

  /**
   * Mission Management
   */
  MISSION_CREATE: 'MISSION_CREATE',
  MISSION_UPDATE: 'MISSION_UPDATE',
  MISSION_DELETE: 'MISSION_DELETE',
  MISSION_PUBLISH: 'MISSION_PUBLISH',
  MISSION_START: 'MISSION_START',
  MISSION_PAUSE: 'MISSION_PAUSE',
  MISSION_END: 'MISSION_END',
  MISSION_REWARD: 'MISSION_REWARD',

  /**
   * Ticket Management
   */
  TICKET_CREATE: 'TICKET_CREATE',
  TICKET_ASSIGN: 'TICKET_ASSIGN',
  TICKET_UPDATE: 'TICKET_UPDATE',
  TICKET_CLOSE: 'TICKET_CLOSE',
  TICKET_ADD_LABEL: 'TICKET_ADD_LABEL',
  TICKET_REMOVE_LABEL: 'TICKET_REMOVE_LABEL',

  /**
   * Game Actions
   */
  TAG_QUERY: 'TAG_QUERY',
  MISSION_OBJECTIVE_QUERY: 'MISSION_COMPLETE_QUERY',

}