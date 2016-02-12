import React from 'react'
import ReactDOM from 'react-dom'

import './App.less'

import PageSpin from '../components/PageSpin/PageSpin.js'

class App extends React.Component {
  render() {
    return (
        <div className="app">{this.props.children}</div>
    )
  }
}

export default App
