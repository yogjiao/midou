import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
let update = require('react-addons-update');

import UserOrderDetailGroup from 'UserOrderDetailGroup.js'

import './UserOrderDetail.less'
class UserOrderDetail extends React.Component {
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
        <div className="status-container">
          <div className="status-wrap">
            <i>订单状态：</i><span>已发货</span>
          </div>
          <div className="order-id-wrap">
            <i>订单号：</i><span>16160127024045</span>
          </div>
          <div className="order-tips">
            请在2小时内完成付款逾期订单将自动取消
          </div>
        </div>
        {
           this.state.goodList.map((item, index) => {
            return (<UserOrderDetailGroup
                      key={index}
                      source={item}
                    />)
          })
        }
        <dl className="input-group receiver-info">
          <dt className="ff-Medium">收货人信息</dt>
          <dd>
            <div className="dd-warp">
               <div>
                 <div className="info-wrap">平晶晶 </div>
                 <div className="info-wrap">15999567444</div>
                 <div className="info-wrap">广东省  深圳市  南山区  桃源村34栋206</div>
               </div>
            </div>
          </dd>
        </dl>
        <dl className="input-group pay-way">
          <dt className="ff-Medium">支付信息</dt>
          <dd>
            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  支付宝
               </div>
               <div className="info-wrap font-gray">
                  支付宝钱包
               </div>
            </div>
            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  优惠方式
               </div>
               <div className="info-wrap font-gray">
                  <div className="arial">-10元</div>
                  <div className="discount-name">首单立减</div>
               </div>
            </div>
            <div className="dd-warp">
               <div className="info-wrap font-gray">
                  实际支付
               </div>
               <div className="info-wrap font-gray">
                 <div className="arial">99元</div>
               </div>
            </div>
          </dd>
        </dl>
        <div className="flow-wrap">
          <div className="justify-wrap">
            查看物流
          </div>
        </div>
      </div>
    )
  }
}

module.exports = UserOrderDetail
