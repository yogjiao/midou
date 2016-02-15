import React from 'react'
import ReactDOM from 'react-dom'

import './App.less'

import PageSpin from 'PageSpin/PageSpin.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    //this.state = {}
  }
  componentWillUnmount(){
  }
  componentDidMount(){

  }
  getPageSpin = () => this.refs['page-spin'];
  render() {
    let children = React.Children.map(this.props.children, child => React.cloneElement(child, {getPageSpin: this.getPageSpin}));
    return (
        <div className="app" ref="dddd">{children}<PageSpin ref="page-spin"></PageSpin></div>
    )
  }
}

//App.defaultProps = { pageSpin:  (<PageSpin />)};
export default App
