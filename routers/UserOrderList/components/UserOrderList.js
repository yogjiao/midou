import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'


import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
    FETCH_ORDERS,
    FETCH_STATUS_NO_MORE_PRODUCT,
    FETCH_SUCCESS
  } from 'macros.js'
import {fetchAuth} from 'fetch.js'
let update = require('react-addons-update')

import {backToNativePage} from 'webviewInterface.js'
import UserOrderListGroup from 'UserOrderListGroup.js'
import OrdersNoResult from 'OrdersNoResult.js'
import './UserOrderList.less'
class UserOrderList extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      headerName: '所有订单',
      lastOrder: 0,
      pageSize: 5,
      isHiddenPageSpin: true,
      orderList: [],
      isHaveGoods: true,
      isNull: false
    }

  }
  fetchOrders = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_ORDERS}/${this.state.lastOrder}/${this.state.pageSize}`
    if (isScrollLoading) {
      this.setState({isHiddenScrollingSpin: false})
    } else {
      this.setState({isHiddenPageSpin: false})
    }
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHaveGoods = false
          if (this.state.lastOrder == 0){
            this.setState({isNull: true})
          }
        } else if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {
            orderList: {$push: data.order},
            lastOrder: {$set: data.order.slice(-1)[0].id}
          })
          this.setState(nextState)
        }
      })
      .catch((error) => {
      })
      .then(() => {
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
          isHiddenScrollingSpin: true
        })
      })
  };
  handleScroll = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      if (this.state.isHaveGoods && !this.state.isFetching){
        this.fetchOrders(true)
      }
    }
  };
  backHandler = () => {
    //this.props.history.goBack();
    backToNativePage()
      .then((data) => {
      })
  };
  componentDidMount = () => {
    this.fetchOrders()
    document.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {

    document.removeEventListener('scroll', this.handleScroll);
  };
  render() {
    return (
      <div className="order-detail-container">
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
        </PageHeader>
        {
          this.state.isNull?
          (<OrdersNoResult />):
          (
            <div>
              {
                 this.state.orderList.map((item, index) => {
                  return (<UserOrderListGroup
                            key={index}
                            oid={item.id}
                            source={item}
                          />)
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

module.exports = UserOrderList
