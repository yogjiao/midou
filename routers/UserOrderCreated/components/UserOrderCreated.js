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
  LS_RECEIVER,
  PUT_TO_CART
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
let  reactMixin = require('react-mixin')
import * as detailMixins from 'mixins/underwearDetail.js'
import UnderwearSelectPanel from 'UnderwearSelectPanel/UnderwearSelectPanel.js'
import UnderpantsRecommendation from 'UnderpantsRecommendation/UnderpantsRecommendation.js'
import MatchDiscount from 'MatchDiscount/MatchDiscount.js'

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
      totalCount: 0,

      // for recommend underpants, it's the same to underwareDetail
      isHiddenSelectPanel: true,
      size: 0,
      allBase: [],
      braSize: 0, // bra
      baseSize: 0, // bra
      category: 1, // 1：文胸，2:底裤，3:情趣
      boxes: [], // tags
      count: 1,

      goods: {inventoryInfo:{allBase:[], allSize: [], inventory:{}}},
    }
  }
  getChildContext = () => {
    return {
      goodsIds: this.props.params.goodsIds,
      buyActionModel: this.props.params.buyActionModel
    }
  };
  calculateTotal = (nextState) => {
    nextState = nextState || this.state
    let price = 0, count = 0
    let goodList = nextState.goodList
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
    } catch (e) {}

    try {
      price -= nextState.match_buy_coupon.price || 0
    } catch (e) {}

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
    let cartIds = this.state.goodList.map( (item, index) => {
      return item.id;
    })
    let url = `${FETCH_COUPONS}/${cartIds.join()}`
    this.setState({isHiddenPageSpin: false})
    return fetchAuth(url)
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {
          let nextState = {}
          if (data.coupon.length != 0) {
            nextState.couponItemName = `${data.coupon[0].name}  <span class="color-purple arial">-${data.coupon[0].price}</span>`,
            nextState.couponSelectedIndex= 0
            nextState.coupon = data.coupon
          }
          if (data.match_buy_coupon) {
            nextState.match_buy_coupon = data.match_buy_coupon
          }
          this.setState(nextState)

        }
      })
      .catch(error => {
        //this.setState({isHiddenPageSpin: true})
      })
      .then(() => {
        this.setState({isLoadedCouponSource:true, isHiddenPageSpin: true})
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

    } else if (target = getParentByClass(e.target, 'ur-card')) {
      let index = target.getAttribute('data-index')
      let goods = this.refs.recommend.state.recommends[index]
      goods.inventoryInfo =
        this.rebuildInventory(goods.inventory, goods.category)

      let schema = {
        category: {$set: goods.category},
        goods: {$set: goods},
        isHiddenSelectPanel: {$set: false}
      }

      if (goods.category == '1') {
        let keys = Object.keys(goods.inventoryInfo.allBase)
        schema.allBase = {$set: keys}
        schema.baseSize = {$set: keys[0]}
        schema.braSize = {$set: goods.inventoryInfo.allBase[keys[0]][0]}
        //nextState.boxes = this.rebuildBoxes(nextState.braSize, nextState.baseSize, nextState.goods.inventoryInfo.inventory)
      } else {
        let keys = Object.keys(goods.inventoryInfo.inventory)
        schema.allSize = {$set: keys}
        schema.size = {$set: keys[0]}
      }
      nextState = update(this.state, schema)
    //  this.setState(nextState)
    }

    nextState && this.setState(nextState)
  };
  postDataToCartHandler = () => {
    let data = this.getPostToCartData()
    let url = `${PUT_TO_CART}/1`
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let index = -1
          index = this.state.goodList.findIndex((item, index) => {
            return item.id == data.cart[0].id
          })

          let range
          if (index == -1) {
            range = [0, 0].concat(data.cart)
          } else {
            range = [index, 1].concat(data.cart)
          }

          let nextState = update(this.state, {goodList: {$splice: [range]}})
          this.setState(nextState)
          this.fetchCouponSource()
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }

      })
      .catch((e) => {
        this.setState({promptMsg: errors[e.rea]})
      })

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

    data.coupon_id = []
    if (this.state.couponSelectedIndex > -1) {
      data.coupon_id.push(this.state.coupon[this.state.couponSelectedIndex].id)
    }
    if (this.state.match_buy_coupon) {
      data.coupon_id.push(this.state.match_buy_coupon.id)
    }
    data.coupon_id = data.coupon_id.join()


    data.cart_id = this.state.goodList.map( (item, index) => {
      return item.id;
    })
    data.cart_id = data.cart_id.join(',')
    this.setState({isHiddenPageSpin: false})
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {//oid
          //this.refs['prompt'].show()

          // return
          notifyAppToCheckout({oid: data.oid})
            .then((dataFromApp) => {
              // this.setState({
              //   isHiddenCheckoutWaitingLayer: false,
              //   orderId: data.oid
              // });
            })

          let signal = {
            signal: PAGE_TO_PAGE_SIGNAL.UPDATE_CART
          }
          sendSignalToOtherPagesByOc(signal)

          this.setState({
            isHiddenPageSpin: true,
            isHiddenCheckoutWaitingLayer: false,
            orderId: data.oid
          })

        } else {
          throw new Error(errors[data.rea])
        }
      })
      .catch(e => {
        this.setState({
          promptMsg: e.message || errors[data.rea],
          isHiddenPageSpin: true,
          isHiddenCheckoutWaitingLayer: true
        })
        this.refs['prompt'].show()
      })
      .then(() => {
        //this.setState({isHiddenPageSpin: true})
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

    let checkout = document.querySelector('.check-out-justify-wrap')

    checkout.parentNode.style.height = checkout.offsetHeight + 'px'
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
          this.props.params.buyActionModel == 1?
            (
              <div>
                <MatchDiscount />
                <UnderpantsRecommendation ref='recommend'/>
              </div>
            ) : ''
        }


        <div className="goods-wrap">
          {
             this.state.goodList.map((item, index) => {
              return (<UserOrderCreatedGroup
                        key={index}
                        source={item}
                      />)
            })
          }
        </div>
        <div className="input-group-wrap">
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
                  <i className="iconfont icon-zhifubao" />
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
                  <i className="iconfont icon-weixin" />
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
            {
              this.state.match_buy_coupon ?
              (
                <dd className="dd-wrap discount-wrap">
                  <em>{this.state.match_buy_coupon.name}</em><span>-{this.state.match_buy_coupon.price}元</span>
                </dd>
              ) : ''
            }

          </dl>
        </div>
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

        <UnderwearSelectPanel
          isHidden={this.state.isHiddenSelectPanel}
          category={this.state.category}
          allSize={this.state.allSize}
          size={this.state.size}
          count={this.state.count}
          selectHandler={this.selectHandler.bind(this)}
          source={this.state.goods}
        />
      </div>
    )
  }
}
UserOrderCreated.childContextTypes = {
  goodsIds: React.PropTypes.string,
  buyActionModel:  React.PropTypes.string
}

reactMixin(UserOrderCreated.prototype, detailMixins)
module.exports = UserOrderCreated
