import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {getParentByClass} from 'util.js'

import PageHeader from 'PageHeader/PageHeader.js'
import Selection from 'Selection/Selection.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {EDIT_CART_GOODS_BY_IDS, FETCH_SUCCESS} from 'macros.js'
import {fetchAuth, fetchMock} from 'fetch.js'
let update = require('react-addons-update');

import UserOrderCreatedGroup from 'UserOrderCreatedGroup.js'

import './UserOrderCreated.less'
class UserOrderCreated extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenPageSpin: false,
      headerName: '我的订单',
      goodList: []
    }

  }
  componentWillMount = () => {
  };
  componentDidMount = () => {
    let url = `${EDIT_CART_GOODS_BY_IDS}/${this.props.params.goodsIds}`
    fetchMock(url)
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
  render() {
    return (
      <div className="order-created-container">
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
             <div className="info-wrap font-gray">
                添加收货人信息
             </div>
             <div>
               <div className="info-wrap">平晶晶 </div>
               <div className="info-wrap">15999567444</div>
               <div className="info-wrap">广东省  深圳市  南山区  桃源村34栋206</div>
             </div>
             <i className="iconfont">&#xe600;</i>
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择支付方式</dt>
          <dd>
             <div className="info-wrap font-gray">
                支付宝
             </div>
             <i className="iconfont">&#xe600;</i>
          </dd>
          <dd>
             <div className="info-wrap font-gray">
                微信
             </div>
             <i className="iconfont">&#xe600;</i>
          </dd>
        </dl>
        <dl className="input-group">
          <dt className="ff-Medium">选择优惠方式</dt>
          <dd>
             <div className="info-wrap font-gray">
                选择优惠方式
             </div>
             <i className="iconfont">&#xe600;</i>
          </dd>
        </dl>
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

module.exports = UserOrderCreated
