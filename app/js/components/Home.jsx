'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'
import TopNavBar from './TopNavBar.jsx'
import NavDrawer from './NavDrawer.jsx'


const mapDispatchToProps = (dispatch) => {
  return {}
}

const styles = {
  navDrawerStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 25,
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    flex: 100,
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}
/**
 * Hivemind
 */
class Home extends React.Component {
  render() {
    let { navDrawerStyle, contentStyle } = styles
    return (
      <div style={navDrawerStyle}>
        <h1>Home</h1>
      </div>

    )
  }
}

export default connect(mapDispatchToProps, mapStateToProps)(Home)