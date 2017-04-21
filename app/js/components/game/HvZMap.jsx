'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import MapImg from './../../../static/map.png'

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
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}

/**
 * HvZMap
 * @class
 */
class HvZMap extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <h1>THIS IS A MAP</h1>
          <img src={MapImg} width="800" height="400" />
        </div>
      </div>
    )
  }
}

/**
 * Export
 * @ignore
 */
export default HvZMap
