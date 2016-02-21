import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import UserOrderItem from 'UserOrderItem/UserOrderItem.js'

let update = require('react-addons-update');


import './UserOrderCreated.less'
class UserOrderCreated extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      headerName: '我的订单',
    }

  }
  componentWillMount = () => {
  };
  componentDidMount = () => {
    this.props.getPageSpin() && this.props.getPageSpin().show()

    fetch('/app/get_cart')
      .then(data => {
        data = {
          cart: [
                  {
                      "id": "10",
                      "ts": "2016-02-04 10:18:32",
                      "goods":
                          [
                              {
                                  "cgid": "1",
                                  "gid": "1",
                                  "name": "商品名",
                                  "main_img": "http://mielseno.com/view/photo/goods/10eb121750562bc8b3e966eb9158361b42697.jpeg",
                                  "count": "2",
                                  "color": "0",
                                  "bottom_bust": "70",
                                  "cup": "A",
                                  "price": "99.00",
                                  "deposit": "0.00",
                                  "total_price": "198.00",
                                  "try": "0"
                              },
                              {
                                  "cgid": "2",
                                  "gid": "1",
                                  "name": "商品名",
                                  "main_img": "http://mielseno.com/view/photo/goods/10eb121750562bc8b3e966eb9158361b42697.jpeg",
                                  "count": "2",
                                  "color": "0",
                                  "bottom_bust": "75",
                                  "cup": "A",
                                  "price": "99.00",
                                  "deposit": "0.00",
                                  "total_price": "99.00",
                                  "try": "1"
                              }
                          ]
                  }
              ]
        }
        if (this.props.params.actionModel == ROUTER_SHOPPING_CART_EDIT) {
          data.cart = this.flatBoxServiceData(data.cart);
        }
        this.setState({goodList: data.cart})
        this.props.getPageSpin().hide();

      })
      .catch(error => this.props.getPageSpin().hide())
  };
  componentWillReceiveProps = (props) => {
  };
  componentWillUpdate = (nextProps, nextState) => {
    nextState.totalPrice = this.calculateTotalPrice(nextState.goodList, nextState.isSelectedAll)
  };
  render() {
    return (
      <div className="order-created-container">
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont">&#xe601;</i>
        </PageHeader>
        <UserOrderItem />
      </div>
    )
  }
}

module.exports = UserOrderCreated
