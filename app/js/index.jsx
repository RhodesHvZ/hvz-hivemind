'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { List, ListItem } from 'material-ui/List'

import store from './store'
import router from './router.jsx'
import TopNavBar from './components/TopNavBar.jsx'

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
    height: '100%'
  },
  appStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    flex: 75,
    height: '100%'
  },
   topBarStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 100,
  }
}

/**
 * MainLayout
 */
class MainLayout extends React.Component {

  render() {
    let { appContainer, appStyle, topBarStyle } = style

    return (
      <div style={appContainer}>
        <div style={appStyle}>
          <div>
            <TopNavBar style={topBarStyle} />
          </div>
          {router}
        </div>
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
