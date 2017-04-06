'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { Route } from 'react-router-dom'
import HvZMap from './HvZMap.jsx'
import Sidebar from './../Sidebar.jsx'
import Missions from './Missions.jsx'

/**
 * Styles
 * @ignore
 */
const styles = {
  parentContentStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'strech',
    height: '100%',
    flex: 100,
  },
  contentStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: '10px',
    paddingRight: '10px',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}
const fillerText = (<div>
                      <h1>Lorem ipsum</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit metus ex, eu laoreet diam sodales eget.
                          Mauris dapibus lacus vel est gravida, sit amet tincidunt mi vehicula. Sed dapibus orci posuere blandit maximus. <br /> <br />
                          Mauris vitae velit id quam efficitur imperdiet. Vivamus placerat, arcu cursus sodales vehicula, purus nulla ornare felis,
                          quis mattis ligula erat eget enim. Aliquam nec congue orci. Donec cursus enim in est iaculis, eu euismod nulla interdum. Donec sed aliquet tortor.
                          Nullam in finibus ipsum. Nulla eget dui sit amet velit convallis pulvinar at sit amet dolor. Aenean viverra, sem in finibus ultrices,
                          massa sapien eleifend ipsum, non vehicula massa lorem vitae est. Sed vitae semper leo, pretium rhoncus nulla. Aliquam a turpis venenatis, gravida erat
                          quis, pretium quam. Donec blandit urna ac ligula sollicitudin, eu condimentum urna aliquam. Praesent nec sapien id erat aliquet tristique. In mollis pellentesque ultrices.
                      </p>
                     </div>
                     )

/**
 * Game
 */
class Game extends React.Component {
  render() {
    let { parentContentStyle, contentStyle } = styles

    let sidebarItems = [
      {text: 'Map', path: '/game/map'},
      {text: 'Byte Code', path: '/game/byte'},
      {text: 'Missions', path: '/game/missions'}
    ]

    let filler = fillerText
    return (
      <div style={parentContentStyle}>
        <Sidebar items={sidebarItems}/>
        <div style={contentStyle}>
          <Route path="/game/" component={() =>  filler } exact={true} />
          <Route path="/game/map" component={HvZMap} />
          <Route path="/game/byte" component={() => <h1>ByteCode: {filler} </h1> } />
          <Route path="/game/missions" component={Missions} />
        </div>
      </div>
    )
  }
}

export default Game
