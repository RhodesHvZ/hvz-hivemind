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

const mapDispatchToProps = (dispatch) => {
  return {}
}


const mapStateToProps = (state, ownProps) => {
    return { open: state.sidebarOpen }
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
          <ListItem primaryText="Map" />
          <ListItem primaryText="Byte Tag" />
          <ListItem primaryText="Item" />
        </List >
      </div>
    )
  }
}

export default connect(mapStateToProps)(Sidebar)
