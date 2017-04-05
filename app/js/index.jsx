'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { List, ListItem } from 'material-ui/List'

import TopNavBar from './components/TopNavBar.jsx'
import Sidebar from './components/Sidebar.jsx'
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
  },
  appStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    flex: 75,
  },
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    flex: 100,
  },
   topBarStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 100,
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}

/**
 * MainLayout
 */
class MainLayout extends React.Component {

  render() {
    let { appContainer, appStyle, parentContentStyle, topBarStyle, contentStyle } = style

    return (
      <div style={appContainer}>
        <div style={appStyle}>
          <div>
            <TopNavBar style={topBarStyle} />
          </div>
          <div style={parentContentStyle}>
            <Sidebar />
            <div style={contentStyle}>
              {router}
            </div>
          </div>
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
