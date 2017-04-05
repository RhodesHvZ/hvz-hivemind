'use strict'


export default function ToggleDrawerReducer(previous = false, action) {

  if (action.type === 'TOGGLE_SIDEBAR') {
    return !previous
  }

  return previous
}
