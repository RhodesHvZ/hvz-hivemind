'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'

import Stats from './Stats.jsx'
import Achievements from './Achievements.jsx'
import Settings from './Settings.jsx'

import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'

import ZombieImg from './../../../static/zombieprofile.png'

/**
 * Styles
 * @ignore
 */
const styles = {
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    flex: 50
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eaeaf2',
    flex: 30
  },
  topStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaf2',
    flex: 30
  },
  bottomStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eaeaf2',
    flex: 100,
    width: screen.width
  },
  paperStyle: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    overflow: 'hidden'
  },
  tabStyle: {
    fontSize: 24,
    paddingTop: 16,
    paddingLeft: 0,
    marginBottom: 12,
    fontWeight: 400,
    width: '100%'
  }
}

/**
 * User Profile
 * @class
 */
class Profile extends React.Component {

  render() {
    let { parentContentStyle, contentStyle, topStyle, bottomStyle, paperStyle, tabStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <div style={topStyle}>
            <Paper style={paperStyle} zDepth={2} circle={true}>
              <img src={ZombieImg} style={{ width: 'auto', height: '120%' }} />
            </Paper>
          </div>
          <div name="Buttom Half" style={bottomStyle}>
            <Tabs style={tabStyle}>
              <Tab label="Home" >
                <div>
                </div>
              </Tab>
              <Tab label="Teams">
                <div>
                </div>
              </Tab>
              <Tab label="Stats">
                <div>
                </div>
              </Tab>
            </Tabs>
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
export default Profile
