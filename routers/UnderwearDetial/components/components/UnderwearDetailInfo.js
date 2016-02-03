import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailInfo.less'

class UnderweardetailInfo extends React.Component {
  render() {
    return (
      <div className="info-wrap">
        <div className="pro-name">mielseno 睫毛蕾丝拼色水滴杯内衣</div>
        <div className="pro-price">&yen; 99</div>
        <div className="detail-item-list">
          <div className="detail-item-wrap">
            <h6 className="item-title"><div className="triangle"></div>商品介绍</h6>
            <div className="detail-content">依偎在松软的被窝里依偎在松软的被窝里依偎在松软的被窝里依偎在松软的被窝里依偎在松软的被窝里依偎在松软的被窝里</div>
          </div>
          <div className="detail-item-wrap">
            <h6 className="item-title"><div className="triangle"></div>盒子服务</h6>
            <div className="detail-content">盒子服务</div>
          </div>
          <div className="detail-item-wrap">
            <h6 className="item-title"><div className="triangle"></div>商品详情</h6>
            <div className="detail-content">依偎在松软的被窝里</div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnderweardetailInfo
