import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderweardetailFooter.less'
class UnderweardetailFooter extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="footer-wrap" onClick={this.props.buyHandler}>
        <div className="fixed-stack">
          <div className="push-to-cart">
            <i className="iconfont">&#xe601;</i>
            <div className="lable">加入购物车</div>
          </div>
          <div className="buy-now" onClick={this.props.buyNowHandler}>
            <div>立刻购买</div>
          </div>
          <div className="push-to-collection">
            <i className="iconfont">&#xe607;</i>
            <div className="lable">加入收藏</div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnderweardetailFooter
