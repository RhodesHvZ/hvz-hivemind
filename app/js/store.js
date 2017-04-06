'use strict'

import { createStore, combineReducers } from 'redux'

import reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  {
    sidebarOpen: true,
    userPopoverData:  {
      open: false,
      anchor: {}
    }
  }
)

export default store
