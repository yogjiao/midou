import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'


import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
    FETCH_ORDERS,
    FETCH_STATUS_NO_MORE_PRODUCT
  } from 'macros.js'
import {fetchMock} from 'fetch.js'
let update = require('react-addons-update')


import UserOrderListGroup from 'UserOrderListGroup.js'

import './UserOrderList.less'
class UserOrderList extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      headerName: '所有订单',
      lastOrder: 0,
      pageSize: 2,
      isHiddenPageSpin: true,
      orderList: [],
      isHaveGoods: true
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
    fetchMock(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHaveGoods = false
        }
        let nextState = update(this.state, {
          orderList: {$push: data.order},
          lastOrder: {$set: data.order.slice(-1)[0].id}
        })
        this.setState(nextState)
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
          <i className="iconfont">&#xe609;</i>
        </PageHeader>
        {
           this.state.orderList.map((item, index) => {
            return (<UserOrderListGroup
                      key={index}
                      source={item}
                    />)
          })
        }

      </div>
    )
  }
}

module.exports = UserOrderList
