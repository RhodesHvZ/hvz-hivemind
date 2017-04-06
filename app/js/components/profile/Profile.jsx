'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import Stats from './Stats.jsx'
import Achievements from './Achievements.jsx'
import Settings from './Settings.jsx'

/**
 * Styles
 * @ignore
 */
const styles = {
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    flex: 50
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eaeaf2',
    flex: 30
  },
  topStyle: {
    osition: 'relative',
    display: 'flex',
    justifyContent: 'flex-start', 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaf2',
    flex: 30
  },
  bottomStyle: {
    osition: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaf2',
    flex: 70
  }
}

/**
 * User Profile
 */
class Profile extends React.Component {
  render() {
    let { parentContentStyle, contentStyle, topStyle, bottomStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <div style={topStyle}>
            <h1>ProfilePicture</h1>
          </div>
          <div style={bottomStyle}>
            <h1>Profile sub categories here</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
