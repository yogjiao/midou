import React from 'react'
import ReactDOM from 'react-dom'
import {BASE_PAGE_DIR} from 'macros.js'

import 'UnderweardetailFooter.less'
class UnderweardetailFooter extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="footer-wrap" onClick={this.props.buyHandler}>
        <div className="fixed-stack">
          <a className="con-server" href={`${BASE_PAGE_DIR}/im/85?productId=${this.props.id}`}>
            <i className="iconfont">&#xe604;</i>
            <div className="lable">客服</div>
          </a>
          {
            this.props.isCollected?
            (
              <div
                className="push-to-collection on"
                data-id={this.props.id}
                data-is-collected={this.props.isCollected}
              >
                <i className="iconfont">&#xe607;</i>
                <div className="lable">已收藏</div>
              </div>
            ):
            (
              <div
                className="push-to-collection"
                data-id={this.props.id}
                data-is-collected={this.props.isCollected}
              >
                <i className="iconfont">&#xe607;</i>
                <div className="lable">加入收藏</div>
              </div>
            )
          }
          <div className="push-to-cart">
            <div>加入购物车</div>
          </div>
          <div className="buy-now" onClick={this.props.buyNowHandler}>
            <div>立刻购买</div>
          </div>


        </div>
      </div>
    )
  }
}

export default UnderweardetailFooter
