'use strict'

/**
 * Actions
 * @ignore
 */
import HeartbeatAction from './socket/HeartbeatAction'
import GetSessionAction from './socket/GetSessionAction'

// USER
import GetUserAction from './socket/GetUserAction'
import SearchUserAction from './socket/SearchUserAction'

// MAIL
import GetMailAction from './socket/GetMailAction'
import PrivateMessageAction from './socket/PrivateMessageAction'

// GAME
import NewGameAction from './socket/NewGameAction'
import GetGameAction from './socket/GetGameAction'
import GetAllGamesAction from './socket/GetAllGamesAction'
import UpdateGameAdminPermissionAction from './socket/UpdateGameAdminPermissionAction'
import RevokeGameAdminPermissionAction from './socket/RevokeGameAdminPermissionAction'
import TransferGameOwnershipAction from './socket/TransferGameOwnershipAction'

/**
 * Export
 * @ignore
 */
export {
  HeartbeatAction,
  GetSessionAction,

  // USER
  GetUserAction,
  SearchUserAction,

  // MAIL
  GetMailAction,
  PrivateMessageAction,

  // GAME
  NewGameAction,
  GetGameAction,
  GetAllGamesAction,
  UpdateGameAdminPermissionAction,
  RevokeGameAdminPermissionAction,
  TransferGameOwnershipAction,
}
