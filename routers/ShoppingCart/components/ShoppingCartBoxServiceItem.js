import React from 'react'
import ReactDOM from 'react-dom'

import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'

class ShoppingCartBoxServiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  render = () => {
    var proItem

    switch (this.props.actionModel) {
      case ROUTER_SHOPPING_CART_SCAN:
        proItem =  (
          <div className="shopping-cart-item">
            <div className="item-wrap">
              <div className="column">
                <div><i className="iconfont">&#xe601;</i></div>
              </div>
              <div className="column">
                <div className="img-wrap">
                  <img src="/media/test.png" />
                </div>
              </div>
              <div className="column">
                <div className="info-name">雪国精灵</div>
                <div className="info-name">尺码</div>
                <div className="info-name price">&yen; 60</div>
              </div>
              <div className="column">
                 <div className="prepay">押</div>
                 <div className="num-mult"><i className="iconfont">&#xe601;</i><span>1</span></div>
              </div>
            </div>
          </div>)
        break;
      case macros.ROUTER_SHOPPING_CART_EDIT:
        proItem = (
          <div className="shopping-cart-item clearfix">
            <div className="item-wrap">
              <div className="column">
                <div><i className="iconfont">&#xe601;</i></div>
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
            <div className="sep-line"></div>
          </div>)
        break;
      default:

    }

    return {proItem}

  };

}

export default ShoppingCartBoxServiceItem
