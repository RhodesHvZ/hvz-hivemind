'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Drawer  from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'

const styles = {
  userToolbarStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 100,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}


const mapStateToProps = (state, ownProps) => {
    return { open: state.drawerOpen }
}

/**
 * NavDrawer
 * A Toolbar component at the top of the web app to handle any user interactions:
 * Session managament, user preferences
 */
class NavDrawer extends React.Component {

    constructor(props) {
    super(props)
    this.state = {open: false}
  }

  //handleToggle()  { this.setState({open: !this.state.open}) }

  render() {
    let { userToolbarStyle } = styles
    return (
      <Drawer open={this.props.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer)
//export default NavDrawer
