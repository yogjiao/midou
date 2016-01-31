import React from 'react'

import './page-header.less'

// import fetch from '../../components/fetch.js'

class HomeListItem extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h1>{this.props.headerName}<h1>
        
      </div>
    )
  }
};
