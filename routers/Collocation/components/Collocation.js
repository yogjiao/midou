import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_MATCH_GOODS
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'
// import fetch from '../../components/fetch.js'
import Swiper from 'Swiper'

import './Collocation.less'
let space = 20;
class Collocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '搭配组合'
    }
    //this.state.tagsIndex[0] = 0
  }
  fetchData = () => {
    
  };
  componentDidMount = () => {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: space,
        width: window.innerWidth - space * 4
    });
  };
  render() {
    return (
      <div className="collocation-container">
        <PageHeader headerName={this.state.headerName}>
          <div></div>
          <a className="menu-search" href={`${BASE_PAGE_DIR}/search`}>所有单品</a>
        </PageHeader>
        <div className="swiper-container">
          <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="mix-cover">
                  <h6>最亲密的也要分散</h6>
                  <div className="mix-intro">
                        依偎在松软的被窝里，小夜灯也散着暖暖的
                        黄临睡的那一秒，接管脑袋的潜意识忽然喃
                        喃道现在的生活你可还喜欢？只答“喜欢”好
                        像过于草率，干脆在心中陈列这一天，从黎
                        明到傍晚从晨起的新衣到夜灯旁的庆山集，
                        嗯，可以安心入眠了。
                  </div>
                  <div className="mix-time">2016/05/03</div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="mix-item-wrap">
                  <div className="img-wrap">
                    <div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}}/>
                  </div>
                  <div className="mix-intro">
                    <div className="mix-adjust">
                    <p>
                        依偎在松软的被窝里，小夜灯也散着暖暖的
                        黄临睡的那一秒，接管脑袋的潜意识忽然喃
                        喃道现在的生活你可还喜欢？只答“喜欢”好
                        像过于草率，干脆在心中陈列这一天，从黎
                        明到傍晚从晨起的新衣到夜灯旁的庆山集，
                        嗯，可以安心入眠了。
                        依偎在松软的被窝里，小夜灯也散着暖暖的
                        黄临睡的那一秒，接管脑袋的潜意识忽然喃
                        喃道现在的生活你可还喜欢？只答“喜欢”好
                        像过于草率，干脆在心中陈列这一天，从黎
                        明到傍晚从晨起的新衣到夜灯旁的庆山集，
                        嗯，可以安心入眠了。
                    </p>
                    </div>
                  </div>
                  <div className="iconfont icon-collection" />
                </div>
              </div>
              <div className="swiper-slide"> 3</div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

module.exports = Collocation
