'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { HashRouter as Router, Route, IndexRoute, Redirect, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Game from './components/game/Game.jsx'
import ProfileRoot from './components/profile/ProfileRoot.jsx'
import Rules from './components/Rules.jsx'

const history = createBrowserHistory()

/**
 * Styles
 */
const styles = {
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    height: '100%',
    flex: 100,
  }
}

/**
 * Export
 * @ignore
 */
export default (
  <Router history={history}>
    <div style={styles.parentContentStyle}>
      <Switch>
        <Redirect exact from='/' to='/game' />
        <Route path="/game" component={Game} exact={false} />
        <Route path="/rules" component={Rules} />
        <Route path="/admincontact" component={() => <h1>Admin contact</h1>} />
        <Route path="/profile" component={ProfileRoot} />
      </Switch>
    </div>
  </Router>
)
