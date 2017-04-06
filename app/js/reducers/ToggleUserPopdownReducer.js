'use strict'

export default function ToggleUserPopDown(previous = {}, action) {

  if (action.type === 'CLOSE_USERPOPDOWN') {
    return Object.assign({}, previous, {
      open: false
    })
  } else if (action.type === 'OPEN_USERPOPDOWN') {
    return Object.assign({}, previous, {
      open: true,
      anchor: action.data
    })
  }

  return previous
}
