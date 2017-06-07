'use strict'

/**
 * UI Reducers
 * @ignore
 */
import ToggleSidebarReducer from './ToggleSidebarReducer'
import ToggleUserPopdownReducer from './ToggleUserPopdownReducer'

/**
 * Socket Response Reducers
 * @ignore
 */
import HeartbeatRequestReducer from './socket/HeartbeatRequestReducer'
import SessionRequestReducer from './socket/SessionRequestReducer'
import UserRequestsReducer from './socket/UserRequestsReducer'

/**
 * Export
 * @ignore
 */
export default {
  // SYSTEM / DEBUG
  heartbeat: (state, action) => HeartbeatRequestReducer.reduce(state, action),
  session: (state, action) => SessionRequestReducer.reduce(state, action),

  // USER
  users: (state, action) => UserRequestsReducer.reduce(state, action),

  // UI
  sidebarOpen: ToggleSidebarReducer,
  userPopdownData: ToggleUserPopdownReducer
}
