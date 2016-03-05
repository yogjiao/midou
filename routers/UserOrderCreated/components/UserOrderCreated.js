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
  BASE_PAGE_DIR,
  FETCH_COUPONS,
  PUT_TO_ORDER,

} from 'macros.js'
import {notifyAppToCheckout} from 'webviewInterface.js'
import {fetchAuth} from 'fetch.js'
let update = require('react-addons-update');

import UserOrderCreatedGroup from 'UserOrderCreatedGroup.js'
import CheckoutWaitingLayer from 'CheckoutWaitingLayer/CheckoutWaitingLayer.js'

import './UserOrderCreated.less'
class UserOrderCreated extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenPageSpin: true,
      isHiddenCheckoutWaitingLayer: true,
      headerName: '我的订单',
      promptMsg: '订单提交成功',
      goodList: [],
      payWay: 'wx', //wx  zfb

      coupon: [],
      couponItemName: '首单优惠',
      couponSelectedIndex: 0,
      isHiddenSelection: true,
      isLoadedCouponSource: false,
      totalPrice: 0,
      totalCount: 0
    }

  }
  calculateTotal = (goodList) => {
    let price = 0, count = 0
    goodList = goodList || this.state.goodList
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
    //nextState = update(this.state, {totalPrice: {$set: price}})
    //this.setState(nextState)
    return {price: price, count: count};
  };
  fetchCouponSource = () => {
    let url = `${FETCH_COUPONS}`
    this.setState({isHiddenPageSpin: false})
    fetchAuth(url)
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            couponItemName: data.coupon[0].name,
            coupon: data.coupon,
            isHiddenSelection: false
          })
        }
      })
      .catch(error => {
        //this.setState({isHiddenPageSpin: true})
      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  thisHandler = (e) => {
    let target
    let nextState
    if (target = getParentByClass(e.target, 'pay-way-wrap')) {
      nextState = {}
      nextState.payWay = target.getAttribute('data-pay-way')
    } else if (target = getParentByClass(e.target, 'coupon-wrap')) {
      if (!this.state.isLoadedCouponSource) {
        this.fetchCouponSource()
      } else {
        this.setState({isHiddenSelection: false})
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
    this.setState({isHiddenPageSpin: false})
    let data = {}
    data.address_id = this.props.params.receiver.id
    data.method_of_payment = this.state.payWay
    try{
      data.coupon_id = this.state.coupon[this.state.couponSelectedIndex].id
    }catch(er) {
      data.coupon_id = '1'
    }

    data.cart_id = this.state.goodList.map( (item, index) => {
      return item.id;
    })
    data.cart_id = data.cart_id.join(',')
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {//oid
          //this.refs['prompt'].show()
          notifyAppToCheckout({oid: data.oid})
            .then((data)=> {
              this.setState({
                isHiddenPageSpin: true,
                isHiddenCheckoutWaitingLayer: false,
                orderId: data.oid
              });
            })

        }
      })
      .catch(error => {
        //this.setState({isHiddenPageSpin: true})
      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  componentDidMount = () => {
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
      .catch(error => {
        //this.setState({isHiddenPageSpin: true})
      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })

  };
  componentWillReceiveProps = (props) => {

  };
  componentWillUpdate = (nextProps, nextState) => {
    let total = this.calculateTotal()
    nextState.totalPrice = total.price;
    nextState.totalCount = total.count;
  };
  render() {
    return (
      <div className="order-created-container" onClick={this.thisHandler}>
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont">&#xe609;</i>
        </PageHeader>
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
              this.props.params.receiver.id?
              (
                <div>
                  <div className="info-wrap">{this.props.params.receiver.name}</div>
                  <div className="info-wrap">{this.props.params.receiver.phone}</div>
                  <div className="info-wrap">{this.props.params.receiver.address}</div>
                </div>
              ):
              (
                <div className="info-wrap font-gray">
                   添加收货人信息
                </div>
              )
            }
             <Link className="iconfont" to={`${BASE_PAGE_DIR}/receivers`}>&#xe600;</Link>
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择支付方式</dt>
          <dd className="pay-way-wrap" data-pay-way="zfb">
             <div className="info-wrap font-gray">
                支付宝
             </div>
             {
               this.state.payWay == 'zfb'?
                (<i className="iconfont">&#xe611;</i>):
                (<i className="iconfont">&#xe610;</i>)
             }

          </dd>
          <dd className="pay-way-wrap"  data-pay-way="wx">
             <div className="info-wrap font-gray">
                微信
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
          <dd className="coupon-wrap">
             <div className="info-wrap font-gray">
                {this.state.couponItemName}
             </div>
             <i className="iconfont">&#xe600;</i>
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
          isHidden={this.state.isHiddenSelection}
          selectedIndex={this.state.couponSelectedIndex}
          source={this.state.coupon.map((item, index) => {
            return {value: item.id, text: item.name, price: item.price}
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
