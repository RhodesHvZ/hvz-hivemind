'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'
import TopNavBar from './TopNavBar.jsx'
import NavDrawer from './NavDrawer.jsx'


const mapDispatchToProps = (dispatch) => {
  return {}
}

const styles = {
  navDrawerStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 25,
  },
   contentStyle: {
    position: 'relative',
    display: 'flex',
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
    let { navDrawerStyle, contentStyle } = styles
    return (
      <div >
        <NavDrawer  />        
          <div >
            <TopNavBar style={contentStyle}/>
          </div>
        </div>

    )
  }
}

export default connect(mapDispatchToProps, mapStateToProps)(Hivemind)