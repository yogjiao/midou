import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailBanner.less'
import {BASE_STATIC_DIR} from 'macros.js'
class UnderweardetailBanner extends React.Component {
  render() {
    let el;
    if (this.props.img) {
      el = <div style={{backgroundImage: `url(${this.props.img})`}} />
    } else {
      el = <div style={{
        backgroundImage: `url(${BASE_STATIC_DIR}/img/neixin.png)`,
        backgroundSize: 'auto'
      }} />
    }
    return (
      <div className="banner-wraper">
        {el}
      </div>
    )
  }
}

export default UnderweardetailBanner
