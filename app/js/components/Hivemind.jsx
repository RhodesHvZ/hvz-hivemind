'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'
import TopNavBar from './TopNavBar.jsx'
import NavDrawer from './NavDrawer.jsx'
import HivemindRouter from './HivemindRouter.jsx'

const mapDispatchToProps = (dispatch) => {
  return {}
}

const styles = {
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

const mapStateToProps = (state, ownProps) => {
  return {}
}
/**
 * Hivemind
 */
class Hivemind extends React.Component {
  render(){
    let { parentContentStyle, contentStyle } = styles
    return (
      <div style={parentContentStyle}>    
          <div>
            <TopNavBar style={contentStyle}/>
          </div>
          {HivemindRouter}
        </div>

    )
  }
}

export default connect(mapDispatchToProps, mapStateToProps)(Hivemind)