import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import './PageSpin.less'

class PageSpin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isHidden: false}
  }
  show() {
    this.setState({isHidden: false});
  }
  hide() {
    this.setState({isHidden: false});
  }
  toggle() {
    this.setState({isHidden: !this.state.isHidden})
  }
  render() {
    return (
      <div className="page-spin" ref="panel" style={{display: (this.state.isHidden? 'none' : 'block ')}}>
        <div className="loader loader-6"></div>
      </div>
    )
  }
}

export default PageSpin
