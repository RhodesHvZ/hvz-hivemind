'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import fs from 'fs'

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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaf2',
    flex: 50,
  }
}

/**
 * Rules
 */
class Rules extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    fs.readFile("./../../static/rules.txt",'utf8', function(err, data){
        if (err) throw err
        this.rulesTxt = data
    })
  }

  render() {
    let { parentContentStyle, contentStyle } = styles

    return (
      <div style={parentContentStyle}>
        <div style={contentStyle}>
          <h1>Rules</h1>
          <p1>{}</p1>
        </div>
      </div>
    )
  }
}

export default Rules