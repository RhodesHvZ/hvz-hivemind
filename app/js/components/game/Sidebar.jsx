'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider';

/**
 * Styles
 * @ignore
 */
const styles = {
  containerStyle: open =>  {
    return {
      position: 'relative',
      display: open ? 'flex' : 'none',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: '#ccccd1',
      flex: 10,
    }
  },
  listStyle: {
    width: '100%'
  }
}

/**
 * mapStateToProps
 * @ignore
 */
const mapStateToProps = (state, ownProps) => {
    return { open: state.sidebarOpen }
}

/**
 * mapDispatchToProps
 * @ignore
 */
const mapDispatchToProps = (dispatch) => {
  return {}
}

/**
 * Sidebar
 */
class Sidebar extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    let { containerStyle, listStyle } = styles
    return (
      <div style={containerStyle(this.props.open)}>
        <List style={listStyle}>
          <ListItem primaryText="Map" onTouchTap={() => document.location.hash='/game/map'}/>
          <ListItem primaryText="Byte Tag" onTouchTap={() => document.location.hash='/game/byte'} />
          <ListItem primaryText="Missions" onTouchTap={() => document.location.hash='/game/missions'} />
        </List >
      </div>
    )
  }
}

export default connect(mapStateToProps)(Sidebar)
