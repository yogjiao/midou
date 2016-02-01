import React from 'react'

import './page-header.less'

// import fetch from '../../components/fetch.js'

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header">
        <div className="adjust-wrap">
          <h1>{this.props.headerName}</h1>
          <div className="menu">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

export default PageHeader
