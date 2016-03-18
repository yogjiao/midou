import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailBanner.less'

class UnderweardetailBanner extends React.Component {
  render() {
    let img = `url(${this.props.img})`
    return (
      <div className="banner-wraper">
        <div style={{backgroundImage: img}} />
      </div>
    )
  }
}

export default UnderweardetailBanner
