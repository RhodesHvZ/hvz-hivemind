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
  containerStyle: open => {
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
  let { status } = state.sidebarOpen
  return { open: status }
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
 * @class
 * 
 * @description
 * Sidebar accepts a property called `items`
 * `items` should be an array of objects for the Sidebar list
 * eg:
 * let sidebarItems = [
 *  {text: 'Item name', path: '/path/to/game', icon: SomeFontIcon}
 * ]
 */
class Sidebar extends React.Component {

  constructor(props) {
    super(props)
  }

  renderSidebarItems(items) {
    return items.map((item) => {
      let { text, path, icon } = item
      return (
        <ListItem
          key={text ? text : ''}
          primaryText={text ? text : ''}
          onTouchTap={() => path ? window.location.hash = path : () => ''}
          icon={icon ? icon : ''}
        />
      )
    })
  }

  render() {
    let { containerStyle, listStyle } = styles
    return (
      <div style={containerStyle(this.props.open)}>
        <List style={listStyle}>
          {
            this.renderSidebarItems(this.props.items)
          }
        </List >
      </div>
    )
  }
}

/**
 * Export
 * @ignore
 */
export default connect(mapStateToProps)(Sidebar)
