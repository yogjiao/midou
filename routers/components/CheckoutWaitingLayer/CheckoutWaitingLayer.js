import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'
import UserOrderItem from 'UserOrderItem/UserOrderItem.js'

import './CheckoutWaitingLayer.less'
class CheckoutWaitingLayer extends React.Component {
  reload = () => {
    window.location.reload()
  };
  componentWillMount = () => {
  };
  componentDidMount = () => {
  };
  componentWillReceiveProps = (props) => {
  };
  componentWillUpdate = (nextProps, nextState) => {
    //nextState.totalPrice = this.calculateTotalPrice(nextState.goodList, nextState.isSelectedAll)
  };
  render() {
    let link
    if (this.props.isReload) {
      link = <div onClick={this.reload} className="btn-scan-order">查看支付详情</div>
    } else {
      link =  <Link to={`${BASE_PAGE_DIR}/order/${this.props.orderId}`} className="btn-scan-order">查看支付详情</Link>
    }
    return (
      <div className="checkout-waiting-container" style={{display: this.props.isHidden? 'none' : 'block'}}>
        <div className="bg-layer"></div>
        <div className="checkout-container">
          <div className="checkout-tips">支付完成后查看支付结果：</div>
          {link}
        </div>
      </div>
    )
  }
}

export default CheckoutWaitingLayer
