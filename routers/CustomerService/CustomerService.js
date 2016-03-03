import React from 'react'
import {
  BASE_STATIC_DIR
} from 'macros.js'

import {backToUserCenterNativePage} from 'webviewInterface.js'

import './CustomerService.less'
class CustomerService extends React.Component {
  backHandler = () => {
    //this.props.history.goBack();
    backToUserCenterNativePage()
      .then((data) => {
        console.log(data.message)
      })
  };
  render = () => {
    return (
      <div className="customer-servie-container">
        <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
        <h2>联系客服</h2>
        <div className="img-wrap weixin-logo">
          <img src={`${BASE_STATIC_DIR}/img/logo-wx.png`} />
        </div>
         <ul className="public-number-wrap">
            <li>
              <i className="iconfont icon-search" />
              <span>请在微信中关注公众号“蜜豆”</span>
            </li>
            <li>
              <i className="iconfont icon-service" />
              <span>在公众号内留言即可</span>
            </li>
         </ul>

         <ul className="connect-way-wrap">
            <li>
              <i>客服电话：</i>
              <span className="arial">0755-26530336</span>
            </li>
            <li>
              <i>客服时间：周一至周五</i>
              <span className="arial">9:00-18:00</span>
            </li>
            <li>
              <i>联系邮箱：</i>
              <span className="arial">kf@mielseno.com</span>
            </li>
         </ul>


        <div className="img-wrap logo-wrap"><img src={`${BASE_STATIC_DIR}/img/neixin.png`} /></div>
      </div>
    )
  };
}

module.exports = CustomerService
