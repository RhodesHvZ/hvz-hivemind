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
    alignItems: 'stretch',
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
 * User Settings
 */
class Settings extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <h1>There are settings here</h1>
        </div>
      </div>
    )
  }
}

export default Settings
