import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {fetchAuth} from 'fetch.js'
import {
  FETCH_ORDER,
  FETCH_SUCCESS,
  PAY_WAY,
  EXPRESS,
  PUT_TO_ORDER,
  BASE_STATIC_DIR,
  DELETE_ORDER
} from 'macros.js'
import orderState from 'orderState.js'
import errors from 'errors.js'
import {notifyAppToCheckout, backToNativePage, receiveNotificationsFromApp} from 'webviewInterface.js'
import provinces from 'provinces'
import CheckoutWaitingLayer from 'CheckoutWaitingLayer/CheckoutWaitingLayer.js'
import UserOrderDetailGroup from 'UserOrderDetailGroup.js'
import FillPrice from './FillPrice.js'
import ua from 'uaParser.js'

import './UserOrderDetail.less'
class UserOrderDetail extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenConfirm: true,
      confirmMsg: '你確定要刪除该订单吗？',
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
    this.setState({
      isHiddenCheckoutWaitingLayer: false,
      isReloadCheckoutWaitinglayer: true
    });
    notifyAppToCheckout({oid: orderId})
        .then((data)=> {

        })
  };
  deleteOrder = () => {
    this.setState({isHiddenPageSpin: false})
    let url = `${DELETE_ORDER}/${this.props.params.orderId}`
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({promptMsg: '订单删除成功'})
          setTimeout(()=>{
            this.props.history.goBack()
            backToNativePage()
              .then((data)=>{

              })
          }, 1500)
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }
      })
      .catch((e) => {
        this.setState({promptMsg: e.message || errors[1]})
      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
        this.refs['prompt'].show()
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
    } else if (target = getParentByClass(e.target, 'btn-delete-order')) {
      this.setState({isHiddenConfirm: false})
    }
  };

  backHandler = () => {
    backToNativePage()
      .then((data)=>{

      })
    this.props.history.goBack();
  };
  deleteReceiverHandler = () => {
    this.deleteOrder()
    this.setState({isHiddenConfirm: true})
  };
  deleteCancelHandler = () => {
    this.setState({isHiddenConfirm: true})
  };
  componentWillMount = () => {
  };
  componentDidMount = () => {
    this.fetchOrderData()
  };
  componentWillReceiveProps = (props) => {
  };
  render() {
    let address
    try {
      address = this.state.address[0] || {}
    } catch (err) {
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

    let bg = `url(${BASE_STATIC_DIR}/img/od-bg.png)`

    // let totalPrice = (() => {
    //
    //   let price = this.state.order[0].total_price
    //
    //   this.state.coupon.forEach((item, index) => {
    //     price = price - item.price
    //   })
    //   return new Number(price).toFixed(2)
    // })()
    return (


      <div className="order-detail-container min-screen-height" onClick={this.thisHandler}>
        {
          ua.isApp()?
          '':
          (
            <PageHeader headerName={this.state.headerName}>
              <i className="iconfont" onClick={this.backHandler}>&#xe609;</i>
              {
                this.state.order[0].order_state < '12'?
                (<div className="btn-delete-order">删除订单</div>):
                ''
              }
            </PageHeader>
          )
        }

        <div className="status-container" style={{backgroundImage: bg}}>
          <div className="status-wrap">
            <i>订单状态：</i><span>{orderState[this.state.order[0].order_state]}</span>
          </div>
          <div className="order-id-wrap">
            <i>订单号：</i><span>{this.state.order[0].id}</span>
          </div>
          {
            this.state.order[0].order_state == '10'?
            (
              <div className="order-tips">
                请在2小时内完成付款逾期订单将自动取消
              </div>
            ):''
          }


        </div>
        {
           this.state.order[0].goods.map((item, index) => {
            return (<UserOrderDetailGroup
                      key={index}
                      source={item}
                      orderState={this.state.order[0].order_state}
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
            {
              this.state.coupon.map((item, index) => {
                if (index == 0) {
                  return (
                    <div className="dd-warp">
                       <div className="info-wrap font-gray">
                          优惠方式
                       </div>
                       <div className="info-wrap font-gray">
                          <div className="arial discount-price">{`-${item.price}元`}</div>
                          <div className="discount-name">{`${item.name}`}</div>
                       </div>
                    </div>)
                } else {
                  return (
                    <div className="dd-warp">
                       <div className="info-wrap font-gray">
                       </div>
                       <div className="info-wrap font-gray">
                          <div className="arial discount-price">{`-${item.price}元`}</div>
                          <div className="discount-name">{`${item.name}`}</div>
                       </div>
                    </div>
                  )
                }
              })
            }

            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  实际支付
               </div>
               <div className="info-wrap font-gray">
                 <div className="arial">
                   {this.state.order[0].total_price}
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
        <Confirm
          confirmHandler={this.deleteReceiverHandler}
          isHidden={this.state.isHiddenConfirm}
          msg={this.state.confirmMsg}
          cancelHandler={this.deleteCancelHandler}
        />
        <PageSpin isHidden={this.state.isHiddenPageSpin} />
        <Prompt msg={this.state.promptMsg}  ref="prompt"/>
      </div>
    )
  }
}

module.exports = UserOrderDetail
