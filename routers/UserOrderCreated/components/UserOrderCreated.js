import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
import Prompt from 'Prompt/Prompt.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {
  EDIT_CART_GOODS_BY_IDS,
  FETCH_SUCCESS,
  FETCH_STATUS_NO_MORE_PRODUCT,
  BASE_PAGE_DIR,
  FETCH_COUPONS,
  PUT_TO_ORDER,
  SELECT,
  PAGE_TO_PAGE_SIGNAL,
  LS_PAY_WAY,
  LS_RECEIVER
} from 'macros.js'
import {
  notifyAppToCheckout,
  backToNativePage,
  receiveNotificationsFromApp,
  recievePageToPageSignal,
  sendSignalToOtherPagesByOc
} from 'webviewInterface.js'
import {fetchAuth} from 'fetch.js'
let update = require('react-addons-update')
import errors from 'errors.js'
import UserOrderCreatedGroup from 'UserOrderCreatedGroup.js'
import CheckoutWaitingLayer from 'CheckoutWaitingLayer/CheckoutWaitingLayer.js'
import ua from 'uaParser.js'

import './UserOrderCreated.less'
class UserOrderCreated extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenPageSpin: true,
      isHiddenCheckoutWaitingLayer: true,
      headerName: '创建订单',
      promptMsg: '订单提交成功',
      goodList: [],
      payWay: localStorage.getItem(LS_PAY_WAY) || 'wx', //wx  zfb
      receiver: JSON.parse(localStorage.getItem(LS_RECEIVER)) || {},

      coupon: [],
      couponItemName: '选择优惠方式',
      couponSelectedIndex: -1,
      isHiddenSelection: true,
      isLoadedCouponSource: false,
      totalPrice: 0,
      totalCount: 0
    }
  }
  calculateTotal = (nextState) => {
    let price = 0, count = 0
    let goodList = this.state.goodList
    goodList.forEach((item, index) => {
      item.goods.forEach((item, index) => {
          if (index == 0) {
            price += item.price * item.count
          } else {
            price += item.deposit * item.count
          }
          count += 1 * item.count
      })
    })


    try {
      price -= nextState.coupon[nextState.couponSelectedIndex].price || 0
    } catch (e) {

    }
    price =  new Number(price).toFixed(2)
    //nextState = update(this.state, {totalPrice: {$set: price}})
    //this.setState(nextState)
    return {price: price, count: count};
  };
  fetchData = () => {
    let url = `${EDIT_CART_GOODS_BY_IDS}/${this.props.params.goodsIds}`
    this.setState({
      isHiddenPageSpin: true
    })
    fetchAuth(url)
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            goodList: data.cart,
            isHiddenPageSpin: true
          })
        }
      })
      .then(() => {
        return this.fetchCouponSource()
      })
      .catch(error => {
        //this.setState({isHiddenPageSpin: true})
      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  fetchCouponSource = () => {
    let url = `${FETCH_COUPONS}`
    this.setState({isHiddenPageSpin: false})
    return fetchAuth(url)
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            couponItemName: `${data.coupon[0].name}  <span class="color-purple arial">-${data.coupon[0].price}</span>`,
            couponSelectedIndex: 0,
            coupon: data.coupon
          })
        }
      })
      .catch(error => {
        //this.setState({isHiddenPageSpin: true})
      })
      .then(() => {
        this.setState({isLoadedCouponSource:true})
      })
  };
  thisHandler = (e) => {
    let target
    let nextState
    if (target = getParentByClass(e.target, 'pay-way-wrap')) {
      nextState = {}
      nextState.payWay = target.getAttribute('data-pay-way')
      localStorage.setItem('payWay', nextState.payWay)
    } else if (target = getParentByClass(e.target, 'coupon-wrap')) {
      if (!this.state.isLoadedCouponSource) {
        this.fetchCouponSource()
      } else if (this.state.coupon.length != 0) {
        this.setState({isHiddenSelection: false})
      } else {
        this.setState({
          promptMsg: '没有符合条件的优惠信息'
        })
        this.refs['prompt'].show()
      }
    } else if (target = getParentByClass(e.target, 'select-item-wrap')) {
       let index = target.getAttribute('data-index')
       let source = JSON.parse(target.getAttribute('data-source'));
       //this.state.couponItemName =
       nextState = {}
       nextState.couponItemName = source.text;
       nextState.couponSelectedIndex = index;
       nextState.isHiddenSelection = true;
    } else if (target = getParentByClass(e.target, 'select-bg-layout')) {
       nextState = {isHiddenSelection: true}
    } else if (target = getParentByClass(e.target, 'btn-check-out')) {
       this.checkoutHandler()

    }

    nextState && this.setState(nextState)
  };
  checkoutHandler = () => {
    let url = `${PUT_TO_ORDER}`
    let nextState = {}

    let data = {}
    data.address_id = this.state.receiver.id
    if (!data.address_id) {
      nextState.promptMsg = '请选择收货人地址'
      this.setState(nextState)
      this.refs['prompt'].show()
      return
    }
    data.method_of_payment = this.state.payWay
    if (!data.method_of_payment) {
      nextState.promptMsg = '请选择支付方式'
      this.setState(nextState)
      this.refs['prompt'].show()
      return
    }
    try{
      data.coupon_id = this.state.coupon[this.state.couponSelectedIndex].id
    }catch(er) {
      data.coupon_id = 0
    }

    data.cart_id = this.state.goodList.map( (item, index) => {
      return item.id;
    })
    data.cart_id = data.cart_id.join(',')
    this.setState({isHiddenPageSpin: false})
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {//oid
          //this.refs['prompt'].show()
          let signal = {
            signal: PAGE_TO_PAGE_SIGNAL.UPDATE_CART
          }
          sendSignalToOtherPagesByOc(signal)
          
          return notifyAppToCheckout({oid: data.oid})
            .then((dataFromApp) => {
              this.setState({
                isHiddenCheckoutWaitingLayer: false,
                orderId: data.oid
              });
            })

        } else {
          throw new Error(errors[data.rea])
        }
      })
      .catch(e => {
        this.setState({promptMsg: e.message || errors[data.rea]})
        this.refs['prompt'].show()
      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  backHandler = () => {
    backToNativePage()
      .then((data)=>{
        if (data.result == '1') {
          this.props.history.goBack()
        }
      })

  };
  isNeedFreshReceiver = (r) => {
    if (this.state.receiver.id) {
      return ['id', 'name', 'phone', 'province', 'city', 'detail'].some((item, index) => {
        return r[item] != this.state.receiver[item]
      })
    } else {
      return false;
    }
  };
  componentDidMount = () => {
    this.fetchData()
    recievePageToPageSignal((data) => {
      if (data.signal == PAGE_TO_PAGE_SIGNAL.SELECT_ADDRESS) {
          delete data.signal
          localStorage.setItem(LS_RECEIVER, JSON.stringify(data))
          this.setState({receiver: data})
      } else if (data.signal == PAGE_TO_PAGE_SIGNAL.UPDATE_ADDRESS) {
        if (this.isNeedFreshReceiver(data)) {
          delete data.signal
          localStorage.setItem(LS_RECEIVER, JSON.stringify(data))
          this.setState({receiver: data})
        }
      } else if (data.signal == PAGE_TO_PAGE_SIGNAL.DELETE_ADDRESS) {
          if (data.id == this.state.receiver.id) {
            this.setState({receiver: {}})
            localStorage.removeItem(LS_RECEIVER)

          }

      }
    })
    // window.addEventListener('storage', (e) => {
    //   alert(e.key)
    //   if (e.key == LS_RECEIVER) {
    //     let selectReceiver = JSON.parse(localStorage.getItem(LS_RECEIVER))
    //     this.setState({receiver: selectReceiver})
    //
    //   }
    // }, false);

    // receiveNotificationsFromApp(function(data){
    //   alert(JSON.stringify(data))
    // })



  };
  componentWillUnmount = () => {

  };
  componentWillReceiveProps = (props) => {

  };
  componentWillUpdate = (nextProps, nextState) => {
    let total = this.calculateTotal(nextState)
    nextState.totalPrice = total.price;
    nextState.totalCount = total.count;
  };
  render() {
    return (
      <div className="order-created-container" onClick={this.thisHandler}>
        {
          ua.isApp()?
          '':
          (
            <PageHeader headerName={this.state.headerName}>
              <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
            </PageHeader>
          )
        }
        {
           this.state.goodList.map((item, index) => {
            return (<UserOrderCreatedGroup
                      key={index}
                      source={item}
                    />)
          })
        }
        <dl className="input-group">
          <dt className="ff-Medium">收货人信息</dt>
          <dd>
            {
              this.state.receiver.id?
              (
                <a className="dd-wrap font-gray on" href={`${BASE_PAGE_DIR}/receivers/${SELECT}`}>
                  <div>
                    <div className="receiver-info-wrap">{this.state.receiver.name}</div>
                    <div className="receiver-info-wrap">{this.state.receiver.phone}</div>
                    <div className="receiver-info-wrap">
                      {`${this.state.receiver.provinceName} ${this.state.receiver.cityName} ${this.state.receiver.detail}`}
                    </div>
                  </div>
                  <i className="iconfont icon-gt" />
                </a>
              ):
              (
                <a className="dd-wrap font-gray" href={`${BASE_PAGE_DIR}/receivers/${SELECT}`}>
                  <div className="info-wrap">
                     添加收货人信息
                  </div>
                  <i className="iconfont icon-gt" />
                </a>
              )
            }
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择支付方式</dt>
          <dd
            className={
              this.state.payWay == 'zfb'?
              'dd-wrap pay-way-wrap font-gray on':
              'dd-wrap pay-way-wrap font-gray'
            }
            data-pay-way="zfb"
          >
             <div className="info-wrap">
                <i className="iconfont icon-zfb" />
                支付宝支付
             </div>
             {
               this.state.payWay == 'zfb'?
                (<i className="iconfont">&#xe611;</i>):
                (<i className="iconfont">&#xe610;</i>)

             }

          </dd>
          <dd
            className={
              this.state.payWay == 'wx'?
              'dd-wrap pay-way-wrap font-gray on':
              'dd-wrap pay-way-wrap font-gray'
            }
            data-pay-way="wx"
          >

             <div className="info-wrap">
                <i className="iconfont icon-wx" />
                微信支付
             </div>
             {
               this.state.payWay == 'wx'?
                (<i className="iconfont">&#xe611;</i>):
                (<i className="iconfont">&#xe610;</i>)
             }
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择优惠方式</dt>
          <dd
            className={this.state.couponSelectedIndex > -1?
              'dd-wrap coupon-wrap font-gray on':
              'dd-wrap coupon-wrap font-gray'
            }
          >
             <div className="info-wrap"
               dangerouslySetInnerHTML={{__html: this.state.couponItemName}}
             >
             </div>
             <i className="iconfont icon-gt"></i>
          </dd>
        </dl>
        <div className="check-out-wrap">
          <div className="check-out-justify-wrap">
            <div className="select-all">
              <span>{`共计${this.state.totalCount}件`}</span>
            </div>
            <div className="total-price">
              <i>合计：</i><span>&yen;{this.state.totalPrice}</span>
            </div>
            <div  className="btn-check-out">结算</div>
          </div>
        </div>
        <Selection
          title="我的优惠"
          isHidden={this.state.isHiddenSelection}
          selectedIndex={this.state.couponSelectedIndex}
          source={this.state.coupon.map((item, index) => {
            return {
              value: item.id,
              text: `${item.name}  <span class="color-purple arial">-${item.price}</span>`,
              price: item.price
            }
          })}
          itemType='1'
        />
        <Prompt ref="prompt" msg={this.state.promptMsg} />
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
        <CheckoutWaitingLayer
          orderId={this.state.orderId}
          isHidden={this.state.isHiddenCheckoutWaitingLayer}
        />
      </div>
    )
  }
}

module.exports = UserOrderCreated
