'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import TopNavBar from './TopNavBar.jsx'
import Sidebar from './Sidebar.jsx'

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
 * Home
 */
class Home extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles
    
    return (
      <div style={parentContentStyle}>
        <Sidebar />
        <div style={contentStyle}>
          <h1>Home</h1>
        </div>
      </div>
    )
  }
}

export default Home
