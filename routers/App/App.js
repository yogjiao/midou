import React from 'react'
import ReactDOM from 'react-dom'

import './App.less'

import PageSpin from '../components/PageSpin/PageSpin.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    //this.state = {}
  }
  render() {

    let children = React.Children.map(this.props.children, child => React.cloneElement(child, {pageSpin: this.props.pageSpin}));
    return (
        <div className="app">{children}{this.props.pageSpin}</div>
    )
  }
}

App.defaultProps = { pageSpin:  (<PageSpin data-yyp="杨永鹏" />)};
export default App
