'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import UserMenu from './UserMenu.jsx'

/**
 * styles
 * @ignore
 */
const styles = {
  userToolbarStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 100,
  },
  endToolbarItemStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 100,
  }
}

/**
 * mapDispatchToProps
 * @ignore
 */
const mapDispatchToProps = (dispatch) => {
  return {

    // Toggle the state of the left sidebar
    toggleOpen: () => {
      dispatch({ type: 'TOGGLE_SIDEBAR' })
    },

    // Open the user popdown on the top right corner of the page
    openPopdown: (event) => {
      dispatch({
        type: 'OPEN_USERPOPDOWN',
        data: event.currentTarget
      })
    }
  }
}

/**
 * UserToolbar
 * @class
 *
 * @description
 * A Toolbar component at the top of the web app to handle any user interactions:
 * Session managament, user preferences
 */
class TopNavBar extends React.Component {

  render() {
    let { userToolbarStyle, endToolbarItemStyle } = styles

    return (
      <Toolbar>
        <ToolbarGroup style={userToolbarStyle}>
          <UserMenu />
          <FlatButton label="Hamburger" onTouchTap={() => this.props.toggleOpen()} />
          <FlatButton label="Game" onTouchTap={() => window.location.hash = '/'} />
          <FlatButton label="Rules" onTouchTap={() => window.location.hash = 'rules'} />
          <FlatButton label="Admin Details" onTouchTap={() => window.location.hash = 'admincontact'} />
          <FlatButton label="Dev" onTouchTap={() => window.location.hash = 'dev'} />
          <ToolbarGroup style={endToolbarItemStyle}>
            <FlatButton label="User" onTouchTap={(event) => this.props.openPopdown(event)} />
          </ToolbarGroup>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

/**
 * Export
 * @ignore
 */
export default connect(null, mapDispatchToProps)(TopNavBar)
