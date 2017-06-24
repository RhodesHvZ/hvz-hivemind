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
import UpdateGameAction from './socket/UpdateGameAction'
import UpdateGameAdminPermissionAction from './socket/UpdateGameAdminPermissionAction'
import RevokeGameAdminPermissionAction from './socket/RevokeGameAdminPermissionAction'
import TransferGameOwnershipAction from './socket/TransferGameOwnershipAction'

// PLAYER
import GetPlayerAction from './socket/GetPlayerAction'
// import GetOwnPlayersAction from './socket/GetOwnPlayersAction'
import UpdatePlayerAction from './socket/UpdatePlayerAction'
import SearchPlayerAction from './socket/SearchPlayerAction'
import RegisterPlayerAction from './socket/RegisterPlayerAction'
import ActivatePlayerAction from './socket/ActivatePlayerAction'
import DeactivatePlayerAction from './socket/DeactivatePlayerAction'
import KillPlayerAction from './socket/KillPlayerAction'
import RevivePlayerAction from './socket/RevivePlayerAction'
import SuspendPlayerAction from './socket/SuspendPlayerAction'
import AddPlayerSuperstateAction from './socket/AddPlayerSuperstateAction'
import RemovePlayerSuperstateAction from './socket/RemovePlayerSuperstateAction'
import TagPlayerAction from './socket/TagPlayerAction'

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
  UpdateGameAction,
  UpdateGameAdminPermissionAction,
  RevokeGameAdminPermissionAction,
  TransferGameOwnershipAction,

  // PLAYER
  GetPlayerAction,
  // GetOwnPlayersAction,
  UpdatePlayerAction,
  SearchPlayerAction,
  RegisterPlayerAction,
  ActivatePlayerAction,
  DeactivatePlayerAction,
  KillPlayerAction,
  RevivePlayerAction,
  SuspendPlayerAction,
  AddPlayerSuperstateAction,
  RemovePlayerSuperstateAction,
  TagPlayerAction,
}
