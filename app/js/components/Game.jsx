'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { Route } from 'react-router-dom'
import TopNavBar from './TopNavBar.jsx'
import Sidebar from './Sidebar.jsx'
import HvZMap from './HvZMap.jsx'

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
 * Game
 */
class Game extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <Sidebar />
        <div style={contentStyle}>
          <Route path="/" component={() => <h1>Actual Home</h1>} exact={true} />
          <Route path="/game/" component={() => <h1>Actual Home</h1>} exact={true} />
          <Route path="/game/map" component={HvZMap} />
          <Route path="/game/byte" component={() => <h1>Byte</h1> } />
        </div>
      </div>
    )
  }
}

export default Game
