'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'

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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}

/**
 * Missions
 */
class Missions extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <h1>Missions</h1>
        </div>
      </div>
    )
  }
}

export default Missions
