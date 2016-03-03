import React from 'react'
import ReactDOM from 'react-dom'



import './App.less'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillUnmount(){
  }
  componentDidMount(){

  }
  getPageSpin = () => this.refs['page-spin'];

  render() {
    //let children = React.Children.map(this.props.children, child => React.cloneElement(child, {getPageSpin: this.getPageSpin}));
    return (
        <div className="app-container">{this.props.children}</div>
    )
  }
}
export default App
