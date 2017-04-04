'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Hivemind from './components/Hivemind.jsx'


const history = createBrowserHistory()
/**
 * Export
 * @ignore
 */
export default (
  <Router history={history}>
    <div>
      <Route exact={true} path="/" component={Hivemind} />
    </div>
  </Router>
)
