import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailBanner.less'
import {BASE_STATIC_DIR} from 'macros.js'
class UnderweardetailBanner extends React.Component {
  render() {
    let el;
    if (this.props.thumb_img_list) {
      el = <div className="bg-wrap" style={{backgroundImage: `url(${this.props.thumb_img_list})`}} />
    } else {
      el = <div className="bg-wrap" style={{
        backgroundImage: `url(${BASE_STATIC_DIR}/img/neixin.png)`,
        backgroundSize: 'auto'
      }} />
    }
    return (
      <div className="banner-wraper">
        <div className="bg-adjust">{el}</div>
        <div className="pro-name">蜜豆mielseno 西瓜红单层蕾丝水滴杯内衣</div>
        <p className="price-wrap">&yen;{this.props.price}</p>
      </div>
    )
  }
}

export default UnderweardetailBanner
