import React from 'react'
import {
  BASE_STATIC_DIR,
  BASE_PAGE_DIR
} from 'macros.js'
import {backToNativePage} from 'webviewInterface.js'
import Swiper from 'Swiper'

import './BoxService.less'
class BoxService extends React.Component {
  backHandler = () => {

    backToNativePage()
      .then((data) => {
      })
    this.props.history.goBack();
  };
  componentDidMount = () => {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true
    })
  };
  render = () => {
    let h = window.innerHeight
    return (
      <div className="box-servie-container">
        <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
        <div className="swiper-container" style={{height: h}}>
          <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="box-service-wrap">
                  <h2>免费试衣</h2>
                  <div className="img-wrap">
                    <div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/box-3.png)`}}/>
                  </div>
                  <h6>购买1件送达2件</h6>
                  <p className="tips-wrap">
                    每选购一件内衣，您可以<br />免费试穿一件相邻码数的内衣
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-service-wrap">
                  <h2>全程包邮</h2>
                  <div className="img-wrap">
                    <div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/box-2.png)`}}/>
                  </div>
                  <h6>抵¥60返¥70</h6>
                  <p className="tips-wrap">
                    结账时需暂时放入60元试穿基金，<br />
被试穿的内衣成功退回后，<br />
返程邮费与试穿基金将一起返还至您的账户
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-service-wrap">
                  <h2>诚信得好礼</h2>
                  <div className="img-wrap">
                    <div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/box-1.png)`}}/>
                  </div>
                  <h6>升级盒子</h6>
                  <p className="tips-wrap">
                    及时返还内衣能够提高信用记录<br />
帮助解锁更高级别的试穿盒子
                  </p>
                </div>
              </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    )
  };
}

module.exports = BoxService
