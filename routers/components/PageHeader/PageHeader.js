import React from 'react'

import './PageHeader.less'

// import fetch from '../../components/fetch.js'

class PageHeader extends React.Component {
  render() {
    let style = {}
    if (this.props.isHiddenBottomBorder) {
      style.borderBottomWidth = 0
    }
    return (
      <div className="page-header" >
        <div className="adjust-wrap" style={style}>
          <h1>{this.props.headerName}</h1>
          <div className="menu">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

export default PageHeader
