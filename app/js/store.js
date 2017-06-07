'use strict'

import { createStore, combineReducers } from 'redux'

import reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  {
    sidebarOpen: {
      status:  true
     },
    userPopdownData:  {
      open: false,
      anchor: {}
    }
  }
)

export default store
