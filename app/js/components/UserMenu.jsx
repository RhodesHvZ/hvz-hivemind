'use strict'

import React from 'react'
import Menuitem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import { connect } from 'react-redux'

/**
 * mapDispatchToProps 
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
 */
const mapStateToProps = (state, ownProps) => {
  let { open, anchor } = state.userPopoverData
  return {
    open: open,
    anchor: anchor
  }
}

/**
 * UserMenu 
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
      <div>
        <Popover
          open={this.props.open}
          anchorEl={this.props.anchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={() => this.props.handleRequestClose()}>
          <Menu>
            <Menuitem primaryText="Settings" />
            <Menuitem primaryText="Admin" />
            <Menuitem primaryText="Logout" />
          </Menu>
        </Popover>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
