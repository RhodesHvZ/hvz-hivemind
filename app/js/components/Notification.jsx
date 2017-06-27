'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

/**
 * mapStateToProps
 * @ignore
 */
const mapStateToProps = (state, ownProps) => {
  return {
    builder: ownProps.builder,
    users: state.users
  }
}

/**
 * Notification
 * @class
 */
class Notification extends React.Component {

  render () {
    let builder = this.props.builder
    let notification = builder ? this.props.builder(actions, { users: this.props.users }) : undefined

    if (!notification) {
      return <div>Loading</div>
    }

    let { title, text, icon, action } = notification

    return (
      <div>
        <p>{title}</p>
        <p>{text}</p>
        <button onClick={action}>Click Me!</button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Notification)
