'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { Route } from 'react-router-dom'
import Ticket from './Ticket.jsx'
import Profile from './Profile.jsx'
import Admin from './Admin.jsx'
import Settings from './Settings.jsx'
import Stats from './Stats.jsx'
import Achievements from './Achievements.jsx'
import Sidebar from './../Sidebar.jsx'


/**
 * Styles
 * @ignore
 */
const styles = {
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    flex: 100,
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: '10px',
    paddingRight: '10px',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}

const sidebarItems = [
  { text: 'Home', path: '/profile' },
  { text: 'Settings', path: '/profile/settings' },
  { text: 'Achievement', path: '/profile/achievements' },
  { text: 'Stats', path: '/profile/stats' }
]

/**
 * Root Profile 
 */
class ProfileRoot extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <Sidebar items={sidebarItems} />
        <div style={contentStyle}>
          <Route path="/profile/" component={Profile} exact={true} />
          <Route path="/profile/ticket" component={Ticket} />
          <Route path="/profile/settings" component={Settings} />
          <Route path="/profile/achievements" component={Achievements} />
          <Route path="/profile/stats" component={Stats} />
          <Route path="/profile/admin" component={Admin} />
        </div>
      </div>
    )
  }
}
export default ProfileRoot
