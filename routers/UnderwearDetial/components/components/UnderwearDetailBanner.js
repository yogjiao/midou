import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailBanner.less'

class UnderweardetailBanner extends React.Component {
  render() {
    return (
      <div className="banner-wraper">
        <img src={this.props.img}/>
      </div>
    )
  }
}

export default UnderweardetailBanner
