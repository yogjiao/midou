import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_MATCH_GOODS,
  FETCH_SUCCESS
} from 'macros.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'
import {getParentByClass} from 'util.js'
// import fetch from '../../components/fetch.js'
import Swiper from 'Swiper'

import './Collocation.less'
let space = 20;
class Collocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '',
      isHiddenPageSpin: false,
      isHiddenSharePanel: true,
      match: {},
      goods: []
    }
    //this.state.tagsIndex[0] = 0
  }
  fetchData = () => {
    let url = `${FETCH_MATCH_GOODS}/${this.props.params.collocationId}`
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          data.isHiddenPageSpin = true
          this.setState(data, () => {
            this.swiper.updateSlidesSize()
            this.swiper.updatePagination()
          })
        } else {

        }

      })
      .catch(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'icon-arrow-left')) {
      this.props.history.goBack()
    } else if (target = getParentByClass(e.target, 'icon-share')) {
      nextState.isHiddenSharePanel = false
    }
  };
  formatTime = (seconds) => {
    let oDate = new Date(seconds * 1000)
    let y = oDate.getFullYear()
    let m = oDate.getMonth() + 1
    let d = oDate.getDate()
    return `${y}/${m}/${d}`
  };
  componentDidMount = () => {
    this.fetchData()

    this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: space,
        width: window.innerWidth - space * 4
    });
  };
  render() {
    let h = window.innerHeight;
    return (
        <div className="collocation-container" onClick={this.thisHandler}>
        <PageHeader headerName={this.state.headerName}>
          <div className="iconfont icon-arrow-left"></div>
          <div className="iconfont icon-share"></div>
        </PageHeader>
        <div className="collocation-wrap" style={{backgroundImage: `url(${this.state.match.match_img})`, height: h}}>
          <div className="overlayer">
            <div className="swiper-container">

                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="mix-cover">
                        <h6>{this.state.match.match_title}</h6>
                        <div className="mix-intro">{this.state.match.match_intro}
                        </div>
                        <div className="mix-time">{this.formatTime(this.state.match.ts)}</div>
                      </div>
                    </div>
                    {
                      this.state.goods.map((item, index) => {
                        return (
                          <div className="swiper-slide" key={index}>
                            <div className="mix-item-wrap">
                              <div className="img-wrap">
                                <div style={{backgroundImage: `url(${item.thumb_img})`}}/>
                              </div>
                              <div className="mix-intro">
                                <div className="mix-adjust">
                                  <p>{item.intro}</p>
                                </div>
                              </div>
                              <div className="iconfont icon-collection" />
                            </div>
                          </div>
                        )
                      })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <ShareToSocialMedia
          isHidden={this.state.isHiddenSharePanel}
        />
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

module.exports = Collocation
