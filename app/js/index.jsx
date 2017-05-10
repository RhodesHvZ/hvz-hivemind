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
    socket.emit('PLAYER_ACTIVATE', { player : 'thecallsign' })
  }

  render() {
    let { appContainer } = style
    socket.on('connect', function(){
      console.log(socket.id); // 'G5p5...'
    });
    // return the dom element
    return (
      <div style={appContainer}>
        <input id="txtInput"></input>
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
