import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
let update = require('react-addons-update');

import UserOrderCreatedGroup from 'UserOrderCreatedGroup.js'

import './UserOrderCreated.less'
class UserOrderCreated extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      headerName: '我的订单',
      goodList: []
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
        this.setState({goodList: data.cart})

        this.props.getPageSpin().hide();

      })
      .catch(error => this.props.getPageSpin().hide())
  };
  componentWillReceiveProps = (props) => {
  };
  render() {
    return (
      <div className="order-created-container">
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont">&#xe601;</i>
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
             <div className="info-wrap font-gray">
                添加收货人信息
             </div>
             <div>
               <div className="info-wrap">平晶晶 </div>
               <div className="info-wrap">15999567444</div>
               <div className="info-wrap">广东省  深圳市  南山区  桃源村34栋206</div>
             </div>
             <i className="iconfont">&#xe601;</i>
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择支付方式</dt>
          <dd>
             <div className="info-wrap font-gray">
                支付宝
             </div>
             <i className="iconfont">&#xe601;</i>
          </dd>
          <dd>
             <div className="info-wrap font-gray">
                微信
             </div>
             <i className="iconfont">&#xe601;</i>
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择优惠方式</dt>
          <dd>
             <div className="info-wrap font-gray">
                选择优惠方式
             </div>
             <i className="iconfont">&#xe601;</i>
          </dd>
        </dl>
        <Selection
          source={[{value: 1, text: 3}, {value: 1, text: 3}]}
          selectedIndex="1"
          selectedvalue="1"
          selectedText="3"
          itemType="1"
        />
      </div>
    )
  }
}

module.exports = UserOrderCreated
