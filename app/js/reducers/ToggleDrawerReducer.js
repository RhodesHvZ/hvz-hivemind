'use strict'


export default function ToggleDrawerReducer(previous = false, action) {

  if (action.type === 'TOGGLE_DRAWER') {
    console.log('Hit reducer')
    return Object.assign({drawerOpen: !previous })
  }

  return previous
}
