'use strict'

/**
 * Dependencies
 * @ignore
 */
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

    // Close the usermenu on the top right corner of the page
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
 * 
 * @description
 * A Usermenu component at the top right of the web app to user interections:
 * Access user preferences
 */
class UserMenu extends React.Component {

  render() {
    
    return (
      <Popover
        open={this.props.open}
        style={{ backgroundColor:'#76FF03' }}
        anchorEl={this.props.anchor}
        anchorOrigin={{ horizontal:'left', vertical:'bottom' }}
        targetOrigin={{ horizontal:'left', vertical:'top' }}
        onRequestClose={() => this.props.handleRequestClose()}>
        <Menu width="100">
          <Menuitem primaryText="Profile " onTouchTap={() => document.location.hash = '/profile'} />
          <Menuitem primaryText="Admin" onTouchTap={() => document.location.hash = '/profile/admin'} />
          <Menuitem primaryText="Ticket" onTouchTap={() => document.location.hash = '/ticket'} />
          <Divider style={{backgroundColor: 'black'}}/>
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
