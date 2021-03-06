'use strict'

import React from 'react'
import { connect } from 'react-redux'

import Menuitem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import Divider from 'material-ui/Divider';

/**
 * mapDispatchToProps
 * @ignore
 */
const mapDispatchToProps = (dispatch) => {
  return {
    handleRequestClose: () => {
      dispatch({
        type: 'CLOSE_USERPOPDOWN'
      })
    }
  }
}

/**
 * mapStateToProps
 * @ignore
 */
const mapStateToProps = (state, ownProps) => {
  let { open, anchor } = state.userPopdownData
  return {
    open: open,
    anchor: anchor
  }
}

/**
 * UserMenu
 * @class
 */
class UserMenu extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render() {

    return (
      <Popover
        minWidth={'5%'}
        open={this.props.open}
        anchorEl={this.props.anchor}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={() => this.props.handleRequestClose()}>
        <Menu>
          <Menuitem primaryText="Profile " onTouchTap={() => document.location.hash = '/profile'} />
          <Menuitem primaryText="Admin" onTouchTap={() => document.location.hash = '/profile/admin'} />
          <Menuitem primaryText="Ticket" onTouchTap={() => document.location.hash = '/profile/ticket'} />
          <Divider />
          <Menuitem primaryText="Logout" />
        </Menu>
      </Popover>
    )
  }
}

/**
 * Export
 * @ignore
 */
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
