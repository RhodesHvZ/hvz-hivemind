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
    alignItems: 'strech',
    height: '100%',
    flex: 100,
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}
/**
 * Root Profile 
 */
class ProfileRoot extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <Route path="/profile/" component={ Profile } exact={true} />
          <Route path="/profile/ticket" component={ Ticket} />
          <Route path="/profile/admin" component={Admin} />
        </div>
      </div>
    )
  }
}
export default ProfileRoot
