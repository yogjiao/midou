import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import * as util from 'util.js'


import './ShoppingCartItem.less'


class ShoppingCartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="shopping-cart-item">
        <div className="column">
          <i className="iconfont">&#xe601;</i>
        </div>
        <div className="column">
          <div className="img-wrap">
            <img src="/media/test.png" />
          </div>
        </div>
        <div className="column">
          <div className="num-wrap">
            <div className="iconfont">&#xe601;</div>
            <div className="num">1</div>
            <div className="iconfont">&#xe601;</div>
          </div>
          <div className="btn-box">添加盒子服务</div>
        </div>
        <div className="column">
           <div className="prepay">押</div>
           <div className="num-mult"><i className="iconfont">&#xe601;</i><span>1</span></div>
        </div>
      </div>
    )
  }
}

export default ShoppingCartItem
