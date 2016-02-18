import React from 'react'
import ReactDOM from 'react-dom'

import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'

class ShoppingCartProductItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

  }
  render = () => {
    let proItem
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
                <div className="row-wrap">
                  <div className="info-col">雪国精灵</div>
                  <div className="extra-col"><div className="prepay">押</div></div>
                </div>
                <div className="row-wrap">
                  <div className="info-col"><i>尺码:</i><span>75C</span></div>
                </div>
                <div className="row-wrap">
                  <div className="info-col price">&yen; 60</div>
                  <div className="extra-col num-mult"><i className="iconfont">&#xe601;</i><span>1</span></div>
                </div>
              </div>
            </div>
          </div>)
        break;
      case ROUTER_SHOPPING_CART_EDIT:
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
                <div className="row-wrap">
                  <div className="num-wrap info-col">
                    <div className="iconfont">&#xe601;</div>
                    <div className="num">1</div>
                    <div className="iconfont">&#xe601;</div>
                  </div>
                  <div className="extra-col"><i className="iconfont btn-delete">&#xe601;</i></div>
                </div>
                <div className="row-wrap">
                  <div className="btn-box info-col">添加盒子服务</div>
                </div>
              </div>


            </div>
            <div className="sep-line"></div>
          </div>)
        break;

    }

    return (<div>{proItem}</div>);
  };
}

export default ShoppingCartProductItem
