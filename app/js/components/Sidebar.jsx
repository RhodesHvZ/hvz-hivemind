'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux'

const styles = {
  sideBarStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#ccccd1',
    flex: 10,
  }
}

/**
 * Sidebar
 */
class Sidebar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let { sideBarStyle } = styles
    return (
      <div style={sideBarStyle}>
        <List style={sideBarStyle}>
          <ListItem primaryText="Map"/>
          <ListItem primaryText="Byte Tag"/>
          <ListItem primaryText="Item"/>
        </List >

      </div>
    )
  }
}

export default Sidebar
