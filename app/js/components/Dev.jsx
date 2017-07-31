'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'
import SocketManager from '../SocketManager'
import Notification from './Notification.jsx'

/**
 * Styles
 * @ignore
 */
const style = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '100',
    position: 'relative',
    marginRight: '30px'
  },
  textareaStyle: {
    resize: 'none',
    overflowY: 'scroll'
  },
  buttonStyle: {
    height: '100px',
    marginTop: '20px'
  },
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    flex: 100,
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}

/**
 * mapStateToProps
 */
const mapStateToProps = (state, ownProps) => {
  let { notifications } = state

  return {
    notifications
  }
}

/**
 * Dev
 * @class
 */
class Dev extends React.Component {

  constructor(props) {
    super(props)
  }

  fireEvent () {
    let data
    try {
      data = JSON.parse(document.getElementById('request').value)
    } catch (err) {
      throw err
    }

    SocketManager.send(data)
  }

  sendTrigger (event) {
    if (event.key === 'Enter' && event.shiftKey) {
      this.fireEvent()
    }
  }

  render () {
    let { appContainer, textareaStyle, buttonStyle, parentContentStyle, contentStyle } = style

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <div style={appContainer}>
            <p><a href="/login">Login.</a> Put complete stringified JSON event data in this text box.</p>
            <textarea onKeyPress={event => this.sendTrigger(event)} style={textareaStyle} rows="30" id="request"></textarea>
            <button style={buttonStyle} onClick={this.fireEvent}>Fire the event!!</button>
            {this.props.notifications.map((notification, idx) => <Notification key={idx} builder={notification} />)}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Export
 * @ignore
 */
export default connect(mapStateToProps)(Dev)
