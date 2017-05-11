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

import SocketEventEnum from '../../common/SocketEventEnum'
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
  }
}

const socket = io()

/**
 * MainLayout
 */
class MainLayout extends React.Component {
  fireEvent() {
    //socket.emit('PLAYER_ACTIVATE', { player : 'thecallsign' })
    let { User, Type } = SocketEventEnum
    socket.emit(Type.GET, User.Data)
    let data = {
      Firstname: document.getElementById("txtFirst").value,
      Lastname: document.getElementById("txtLast").value
    }
    socket.emit(Type.REGISTER_USER, data)
  }

  componentWillMount() {

  }

  setupSocketHandlers(mapping) {
    let { Status, User } = SocketEventEnum
    socket.on(Status.Success, (payload) => {
      console.log(JSON.stringify(payload))
      if (mapping[payload.type]) {
        mapping[payload.type](payload)
      } else {
        socket.log(`Error: No handler for: ${payload.type}`)
      }
    })
  }

  render() {
    let { appContainer } = style
    let { User, Status } = SocketEventEnum
    socket.on(Status.InternalError, () => document.write('500: Internal Server Error'))
    let mapping = {
      [User.Firstname]: (payload) => document.getElementById("txtFirst").value = payload.data,
      [User.Lastname]: (payload) => document.getElementById("txtLast").value = payload.data,
    }
    this.setupSocketHandlers(mapping)
    // return the dom element
    return (
      <div style={appContainer}>
        <input id="txtInput"></input>
        <input id="txtFirst"></input>
        <input id="txtLast"></input>
        <button onClick={this.fireEvent} > Fire the event!! </button>
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
