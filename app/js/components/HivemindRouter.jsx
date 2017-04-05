'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './Home.jsx'


const history = createBrowserHistory()
/**
 * Export
 * @ignore
 */
export default (
  <Router>
    <div>
      <Route path="/Home" component={Home} />
      <Route path="/Rules" component={() => <h1>Rules</h1>} />
      <Route path="/AdminContact" component={() => <h1>Admin contact</h1>} />
    </div>
  </Router>
)
