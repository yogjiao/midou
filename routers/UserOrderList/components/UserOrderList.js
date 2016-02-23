import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
let update = require('react-addons-update');

import UserOrderListGroup from 'UserOrderListGroup.js'

import './UserOrderList.less'
class UserOrderList extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenSpin: true,
      headerName: '订单详情',
      goodList: []
    }

  }
  componentWillMount = () => {
  };
  componentDidMount = () => {
   this.setState({isHiddenSpin: false})

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
        this.setState({goodList: data.cart, isHiddenSpin: true})



      })
      .catch(error => this.setState({isHiddenSpin: true}))
  };
  componentWillReceiveProps = (props) => {
  };
  render() {
    return (
      <div className="order-detail-container">
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont">&#xe601;</i>
        </PageHeader>
        {
           this.state.goodList.map((item, index) => {
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
