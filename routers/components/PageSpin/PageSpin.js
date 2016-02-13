import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import './PageSpin.less'

class PageSpin extends React.Component {
  constructor(props) {
    super(props)
  }
  show() {
    this.refs.panel.style.display = 'none';
  }
  hide() {
    this.refs.panel.style.display = 'block';
  }
  render() {
    return (
      <div className="page-spin" ref="panel">
        <div className="loader loader-6"></div>
      </div>
    )
  }
}

export default PageSpin
