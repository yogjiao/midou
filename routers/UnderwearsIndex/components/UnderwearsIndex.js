import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'
import uaParser from 'uaParser.js'
import Nav from 'Nav/Nav.js'
// import fetch from '../../components/fetch.js'
import Swiper from 'Swiper'

import './UnderwearsIndex.less'
class UnderwearsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '单品'
    }
    //this.state.tagsIndex[0] = 0
  }
  componentDidMount = () => {

    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      slidesPerView: 'auto'
    });
  };
  render() {
    return (
      <div className="uw-index-container">
        <div className="scroll-container">
          <div className="scroll-wrapper">
            <div className="swiper-container bg-neixin" >
              <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <a className="img-wrap" style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/underwears-banner-3.png)`}}></a>
                  </div>
                  <div className="swiper-slide">
                    <a className="img-wrap" href={`${BASE_PAGE_DIR}/box-service`} style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/underwears-banner-1.jpg)`}}></a>
                  </div>
                  <div className="swiper-slide">
                    <a className="img-wrap" href={`${BASE_PAGE_DIR}/business-model`} style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/underwears-banner-2.jpg)`}}></a>
                  </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
            <h2>热门分类</h2>
            <div className="grid-container">
              <a href={`${BASE_PAGE_DIR}/search/0-0/1/0`}>
                <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/uw-topic-1.png?123)`}} /></div>
                <h6>内衣</h6>
              </a>
              <a href={`${BASE_PAGE_DIR}/search/0/2/0`}>
                <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/uw-topic-2.png?123)`}} /></div>
                <h6>底裤</h6>
              </a>
              <a href={`${BASE_PAGE_DIR}/search/0-0/1/1`}>
                <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/uw-topic-3.png?123)`}} /></div>
                <h6>聚拢</h6>
              </a>
              <a href={`${BASE_PAGE_DIR}/search/0-0/1/6`}>
                <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/uw-topic-4.png?123)`}} /></div>
                <h6>运动</h6>
              </a>
              <a href={`${BASE_PAGE_DIR}/search/0/3/0`}>
                <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/uw-topic-5.png?123)`}} /></div>
                <h6>情趣</h6>
              </a>
              <a href={`${BASE_PAGE_DIR}/search/0/0/0`}>
                  <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/uw-topic-6.png?123)`}} /></div>
                <h6>全部单品</h6>
              </a>
            </div>
          </div>
          {
            uaParser.isApp() ? '' : <Nav />
          }
        </div>
      </div>
    )
  }
}

module.exports = UnderwearsIndex
