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
                
              </div>
              <div className="swiper-slide"> 2</div>
              <div className="swiper-slide"> 3</div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

module.exports = Collocation
