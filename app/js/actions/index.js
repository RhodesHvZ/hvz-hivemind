'use strict'

/**
 * Actions
 * @ignore
 */
import HeartbeatAction from './socket/system/HeartbeatAction'
import GetSessionAction from './socket/system/GetSessionAction'

// USER
import GetUserAction from './socket/user/GetUserAction'
import SearchUserAction from './socket/user/SearchUserAction'

// MAIL
import GetMailAction from './socket/mail/GetMailAction'
import PrivateMessageAction from './socket/mail/PrivateMessageAction'

// GAME
import NewGameAction from './socket/game/NewGameAction'
import GetGameAction from './socket/game/GetGameAction'
import GetAllGamesAction from './socket/game/GetAllGamesAction'
import UpdateGameAction from './socket/game/UpdateGameAction'
import UpdateGameAdminPermissionAction from './socket/game/UpdateGameAdminPermissionAction'
import RevokeGameAdminPermissionAction from './socket/game/RevokeGameAdminPermissionAction'
import TransferGameOwnershipAction from './socket/game/TransferGameOwnershipAction'

// PLAYER
import GetPlayerAction from './socket/player/GetPlayerAction'
// import GetOwnPlayersAction from './socket/player/GetOwnPlayersAction'
import UpdatePlayerAction from './socket/player/UpdatePlayerAction'
import SearchPlayerAction from './socket/player/SearchPlayerAction'
import RegisterPlayerAction from './socket/player/RegisterPlayerAction'
import ActivatePlayerAction from './socket/player/ActivatePlayerAction'
import DeactivatePlayerAction from './socket/player/DeactivatePlayerAction'
import KillPlayerAction from './socket/player/KillPlayerAction'
import RevivePlayerAction from './socket/player/RevivePlayerAction'
import SuspendPlayerAction from './socket/player/SuspendPlayerAction'
import AddPlayerSuperstateAction from './socket/player/AddPlayerSuperstateAction'
import RemovePlayerSuperstateAction from './socket/player/RemovePlayerSuperstateAction'
import TagPlayerAction from './socket/player/TagPlayerAction'

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
