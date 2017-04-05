'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import TopNavBar from './components/TopNavBar.jsx'
import NavDrawer from './components/NavDrawer.jsx'
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
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    flex: 75,
  },
   contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
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
    let { appContainer, parentContentStyle, contentStyle } = style

    return (
      <div style={appContainer}>
        <div style={parentContentStyle}>
          <div>
            <TopNavBar style={contentStyle}/>
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
