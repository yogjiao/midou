import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import {fetchMock} from 'fetch.js'
import {
  FETCH_ORDER,
  FETCH_SUCCESS,
  PAY_WAY
} from 'macros.js'
import orderState from 'orderState.js'
import provinces from 'provinces.js'
let update = require('react-addons-update');

import UserOrderDetailGroup from 'UserOrderDetailGroup.js'

import './FillPrice.less'
class FillPrice extends React.Component {


  componentWillMount = () => {
  };
  componentDidMount = () => {

  };
  componentWillReceiveProps = (props) => {
  };
  render() {
    return (
      <div className="fill-price-container" style={{display: this.props.isHidden? 'none' : 'block'}}>
        <div className="fill-price-wrap">
          <div className="img-wrap">
            <img src="/media/test.png" />
          </div>
          <div className="fill-price-name">{this.props.source.name}</div>
          <div className="fill-price-size arial">{this.props.source.price}</div>
          <dl>
            <dt>支付信息</dt>
            <dd><span>抵消押金</span><i>{`-${this.props.source.deposit}元`}</i></dd>
            <dd><span>需补差价</span><i className="color-purple">{`${this.props.source.unpaid_balance}元`}</i></dd>
          </dl>
          <div className="btn-sure">付款</div>
          <div className="iconfont btn-close-fill-price">&#xe602;</div>
        </div>
      </div>
    )
  }
}
FillPrice.defaultProps = {
  source: {}
}

module.exports = FillPrice
