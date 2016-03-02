import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import './PageSpin.less'

class PageSpin extends React.Component {
  render() {
    return (
      <div className="page-spin" ref="panel" style={{display: (this.props.isHidden? 'none' : 'block ')}}>
        <div className="loader loader-6">{this.props.msg}</div>
      </div>
    )
  }
}

export default PageSpin
