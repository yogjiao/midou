import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import {fetchAuth} from 'fetch.js'
import {
  FETCH_ORDER,
  FETCH_SUCCESS,
  PAY_WAY,
  EXPRESS,
  PUT_TO_ORDER
} from 'macros.js'
import orderState from 'orderState.js'
import {notifyAppToCheckout, backToNativePage} from 'webviewInterface.js'
import provinces from 'provinces'
let update = require('react-addons-update');
import CheckoutWaitingLayer from 'CheckoutWaitingLayer/CheckoutWaitingLayer.js'
import UserOrderDetailGroup from 'UserOrderDetailGroup.js'
import FillPrice from './FillPrice.js'


import './UserOrderDetail.less'
class UserOrderDetail extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenPageSpin: true,
      isHiddenFillPrice: true,
      isHiddenCheckoutWaitingLayer: true,
      isReloadCheckoutWaitinglayer: false,
      headerName: '订单详情',
      order: [{goods: []}],
      coupon: [],
      address: []
    }

  }
  fetchOrderData = () => {
    let url = `${FETCH_ORDER}/${this.props.params.orderId}`
    this.setState({isHiddenPageSpin: false})
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            order: data.order,
            coupon: data.coupon,
            address: data.address
          })
        }
      })
      .catch((err) => {

      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  checkout = (orderId) => {
    this.setState({isHiddenPageSpin: false})
    notifyAppToCheckout({oid: orderId})
        .then((data)=> {
          this.setState({
            isHiddenPageSpin: true,
            isHiddenCheckoutWaitingLayer: false,
            isReloadCheckoutWaitinglayer: true
          });
        })
  };
  thisHandler = (e) => {
    let target;
    if (target = getParentByClass(e.target, 'btn-pay-lack')) {
       //this.state fillPriceSource
       let source = JSON.parse(target.getAttribute('data-source'));
       this.setState({fillPriceSource: source, isHiddenFillPrice: false})
    } else if (target = getParentByClass(e.target, 'btn-close-fill-price')) {
       this.setState({isHiddenFillPrice: true})
    } else if (target = getParentByClass(e.target, 'fill-price')) {//补差价
      this.checkout(target.getAttribute('data-oid'))
    } else if (target = getParentByClass(e.target, 'btn-check-out')) {
      this.checkout(this.props.params.orderId)
    }
  };

  backHandler = () => {
    backToNativePage()
      .then((data)=>{

      })
    this.props.history.goBack();
  };
  componentWillMount = () => {
  };
  componentDidMount = () => {
    this.fetchOrderData()
  };
  componentWillReceiveProps = (props) => {
  };
  render() {
    let coupon, address
    try {
      coupon = this.state.coupon[0] || {}
      address = this.state.address[0] || {}
    } catch (err) {
      coupon = {}
      address = {}
    }

    let stack;
    if (this.state.order[0].order_state == '10') {
      stack = (
        <div className="flow-wrap">
          <div className="justify-wrap btn-check-out" >
            重新支付
          </div>
        </div>
      )

    } else if (this.state.order[0].waybill_number) {
      stack = (
        <div className="flow-wrap">
          <div className="justify-wrap">
            <a href={`${EXPRESS}?type=${this.state.order[0].express_company_id}&postid=${this.state.order[0].waybill_number}`}>查看物流</a>
          </div>
        </div>
      )
    }

    let province = provinces.find((item, index) => {
      return item.id == address.province
    })

    return (


      <div className="order-detail-container min-screen-height" onClick={this.thisHandler}>
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont" onClick={this.backHandler}>&#xe609;</i>
        </PageHeader>
        <div className="status-container">
          <div className="status-wrap">
            <i>订单状态：</i><span>{orderState[Math.min(this.state.order[0].order_state, 22)]}</span>
          </div>
          <div className="order-id-wrap">
            <i>订单号：</i><span>{this.state.order[0].id}</span>
          </div>
          <div className="order-tips">
            请在2小时内完成付款逾期订单将自动取消
          </div>
        </div>
        {
           this.state.order[0].goods.map((item, index) => {
            return (<UserOrderDetailGroup
                      key={index}
                      source={item}
                    />)
          })
        }
        <dl className="input-group receiver-info">
          <dt className="ff-Medium">收货人信息</dt>
          <dd>
            {
              address.id?
                (
                  <div className="dd-warp">
                     <div>
                       <div className="info-wrap">{address.name}</div>
                       <div className="info-wrap">{address.phone}</div>
                       <div className="info-wrap">
                        {`${province.name} ${address.city} ${address.detail}`}
                       </div>
                     </div>
                  </div>
                ): ''
            }

          </dd>
        </dl>
        <dl className="input-group pay-way">
          <dt className="ff-Medium">支付信息</dt>
          <dd>
            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  支付方式
               </div>
               <div className="info-wrap font-gray">
                {PAY_WAY[this.state.order[0].method_of_payment]}
               </div>
            </div>
            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  优惠方式
               </div>
               {
                 coupon.id?
                    (
                     <div className="info-wrap font-gray">
                        <div className="arial">{`-${coupon.price}元`}</div>
                        <div className="discount-name">{`${coupon.name}`}</div>
                     </div>
                   ):
                   (<div className="info-wrap font-gray"></div>)
               }
            </div>
            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  实际支付
               </div>
               <div className="info-wrap font-gray">
                 <div className="arial">
                   {
                      this.state.order[0].total_price && coupon.id ?
                      new Number(this.state.order[0].total_price - coupon.price).toFixed(2) :
                      this.state.order[0].total_price
                   }
                 </div>
               </div>
            </div>
          </dd>
        </dl>
        {stack}
        <FillPrice source={this.state.fillPriceSource} isHidden={this.state.isHiddenFillPrice}/>
        <CheckoutWaitingLayer
          orderId={this.state.orderId}
          isReload={this.state.isReloadCheckoutWaitinglayer}
          isHidden={this.state.isHiddenCheckoutWaitingLayer}
        />

      </div>
    )
  }
}

module.exports = UserOrderDetail
