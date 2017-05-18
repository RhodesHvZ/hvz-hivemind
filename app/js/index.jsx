'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import io from 'socket.io-client'

// import SocketEventEnum from '../../common/SocketEventEnum'
// import { Provider } from 'react-redux'

// import store from './store'
// import router from './router.jsx'

/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

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
  },
  textareaStyle: {
    resize: 'none',
    overflowY: 'scroll'
  },
  buttonStyle: {
    height: '100px',
    marginTop: '20px'
  }
}

const socket = io()

/**
 * MainLayout
 */
class MainLayout extends React.Component {

  fireEvent () {
    let data
    try {
      data = JSON.parse(document.getElementById('request').value)
    } catch (err) {
      throw err
    }

    socket.emit('message', data)
  }

  setupSocketHandlers () {
    socket.on('message', payload => {
      console.log(payload)
      document.getElementById('response').innerHTML = JSON.stringify(payload, null, 2)
    })
  }

  componentWillMount () {
    this.setupSocketHandlers()
  }

  render () {
    let { appContainer, textareaStyle, buttonStyle } = style

    return (
      <div style={appContainer}>
        <p>Put complete stringified JSON event data in this text box.</p>
        <textarea style={textareaStyle} rows="30" id="request"></textarea>
        <button style={buttonStyle} onClick={this.fireEvent}>Fire the event!!</button>
        <p>Last response:</p>
        <pre id="response">None yet</pre>
      </div>
    )
  }
}

// /**
//  * DOM
//  * @ignore
//  */
// ReactDOM.render(
//   <MuiThemeProvider>
//     <Provider store={store}>
//       <MainLayout />
//     </Provider>
//   </MuiThemeProvider>,
//   document.getElementById('app')
// )

/**
 * DOM
 * @ignore
 */
ReactDOM.render(
  <MuiThemeProvider>
    <MainLayout />
  </MuiThemeProvider>,
  document.getElementById('app')
)
