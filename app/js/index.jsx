'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HiveMind from './components/Hivemind.jsx'
import { Provider } from 'react-redux'

import store from './store'
import router from './router.jsx'

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

/**
 * MainLayout
 */
class MainLayout extends React.Component {

  render() {
    let { appContainer } = style

    return (
      <div style={appContainer}>
        {router}
      </div>
    )
  }

}

 /**
  * DOM
  * @ignore
  */
 ReactDOM.render(
   <MuiThemeProvider>
     <Provider store={store}>
       <MainLayout />
     </Provider>
   </MuiThemeProvider>,
   document.getElementById('app')
 )

///**
// * DOM
// * @ignore
// */
//ReactDOM.render(
//  <MuiThemeProvider>
//    <MainLayout />
//  </MuiThemeProvider>,
//  document.getElementById('app')
//)
