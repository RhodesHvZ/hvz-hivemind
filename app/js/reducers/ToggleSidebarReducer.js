'use strict'

export default function ToggleSidebarReducer(previous = {}, action) {

  // Toggle the sidebar
  if (action.type === 'TOGGLE_SIDEBAR') {
    return Object.assign({}, previous, {
      status: !previous.status
    })
  }

  return previous
}
