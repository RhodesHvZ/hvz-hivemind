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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleOpen: () => {
      console.log("toggled")
      dispatch({type: 'TOGGLE_SIDEBAR'})
    }
  }
}

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
    this.state = {}
    if(props.drawer){
      this.state.drawer = props.drawer
    } else {
      this.state.drawer = {}
    }
  }

  render() {
    let { userToolbarStyle, endToolbarItemStyle } = styles

    return (
      <Toolbar>
        <ToolbarGroup style={userToolbarStyle}>
          <FlatButton label="Hamburger" onTouchTap={() => this.props.toggleOpen()} />
          <FlatButton label="Home" onTouchTap={() => window.location.hash='/'} />
          <FlatButton label="Rules" onTouchTap={() => window.location.hash='Rules'} />
          <FlatButton label="Admin Details" onTouchTap={() => window.location.hash='AdminContact'} />
          <ToolbarGroup style={endToolbarItemStyle}>
            <FlatButton label="User" onTouchTap={() => this.props.toggleOpen()} />
          </ToolbarGroup>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar)
