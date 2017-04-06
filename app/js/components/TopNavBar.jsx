'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { connect } from 'react-redux'
import UserMenu from './UserMenu.jsx'
import Rules from './Rules.jsx'

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
 */
const mapDispatchToProps = (dispatch) => {
  return {
    toggleOpen: () => {
      dispatch({type: 'TOGGLE_SIDEBAR'})
    },
    openPopover: (event) => {
      dispatch({
        type: 'OPEN_USERPOPDOWN',
        data: event.currentTarget
      })
    }
  }
}

/**
 * mapStateToProps
 */
const mapStateToProps = (state, ownProps) => {
  return { }
}

/**
 * UserToolbar
 * A Toolbar component at the top of the web app to handle any user interactions:
 * Session managament, user preferences
 */
class TopNavBar extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    let { userToolbarStyle, endToolbarItemStyle } = styles

    return (
      <Toolbar>
        <ToolbarGroup style={userToolbarStyle}>
          <UserMenu />          
          <FlatButton label="Hamburger" onTouchTap={() => this.props.toggleOpen()} />
          <FlatButton label="Game" onTouchTap={() => window.location.hash='/'} />
          <FlatButton label="Rules" onTouchTap={() => window.location.hash='rules'} />
          <FlatButton label="Admin Details" onTouchTap={() => window.location.hash='admincontact'} />
          <ToolbarGroup style={endToolbarItemStyle}>
            <FlatButton label="User" onTouchTap={(event) => this.props.openPopover(event)} />
          </ToolbarGroup>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar)
