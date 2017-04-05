'use strict'


export default function ToggleDrawerReducer(previous = false, action) {

  if (action.type === 'TOGGLE_SIDEBAR') {
    console.log('Hit reducer')
    return !previous
  }

  return previous
}
