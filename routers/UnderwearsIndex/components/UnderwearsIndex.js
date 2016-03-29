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
// import fetch from '../../components/fetch.js'
import Swiper from 'Swiper'

import './UnderwearsIndex.less'
class UnderwearsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '所有单品',
      pageIndex: 0,
      pageSize: 6,
      isFetching: false,
      isHaveGoods: true,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isHiddenSearchPanel: true,
      isNull: false,

      sizeIndex: 0,
      braSizeIndex: 0, // bra
      baseSizeIndex: 0, // base
      category: 0, //0: all, 1：文胸，2:底裤，3:情趣
      tagsIndex: [0],//new Array(UNDERWEAR_TAGS.length), // tags
      prolist: [
        //  {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    }
    //this.state.tagsIndex[0] = 0
  }
  componentDidMount = () => {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
  };
  render() {
    return (
      <div className="uw-index-container">
        <PageHeader headerName={this.state.headerName}>
          <div></div>
          <div className="menu-search" >所有单品</div>
        </PageHeader>
        <div className="swiper-container">
          <div className="swiper-wrapper">
              <div className="swiper-slide"> 1</div>
              <div className="swiper-slide"> 2</div>
              <div className="swiper-slide"> 3</div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <h2>热门分类</h2>
        <div className="grid-container">
          <a href={`${BASE_PAGE_DIR}/underwears/0-0/1/0`}>
            <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}} /></div>
            <h6>内衣</h6>
          </a>
          <a href={`${BASE_PAGE_DIR}/underwears/0/2/0`}>
            <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}} /></div>
            <h6>内衣</h6>
          </a>
          <a href={`${BASE_PAGE_DIR}/underwears/`}>
            <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}} /></div>
            <h6>内衣</h6>
          </a>
          <a href={`${BASE_PAGE_DIR}/underwears/0-0/1/6`}>
            <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}} /></div>
            <h6>内衣</h6>
          </a>
          <a href={`${BASE_PAGE_DIR}/underwears/0/3/0`}>
            <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}} /></div>
            <h6>内衣</h6>
          </a>
          <a href={`${BASE_PAGE_DIR}/underwears/0/0/0`}>
            <div className="img-wrap"><div style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/test.png)`}} /></div>
            <h6>内衣</h6>
          </a>
        </div>
      </div>
    )
  }
}

module.exports = UnderwearsIndex
