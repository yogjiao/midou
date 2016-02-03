import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailFooter.less'
class UnderweardetailFooter extends React.Component {
  render() {
    return (
      <div className="footer-wrap">
        <div className="fixed-stack">
          <div>
            <i className="iconfont">&#xe601;</i>
            <div className="lable">加入购物车</div>
          </div>
          <div className="buy-now">
            <div>立刻购买</div>
          </div>
          <div>
            <i className="iconfont">&#xe601;</i>
            <div className="lable">加入收藏</div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnderweardetailFooter
