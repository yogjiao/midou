import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_MATCH_GOODS,
  PUT_COLLECTION,
  FETCH_SUCCESS
} from 'macros.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'
import {getParentByClass} from 'util.js'
import ShareToSocialMedia from 'ShareToSocialMedia/ShareToSocialMedia.js'
import Prompt from 'Prompt/Prompt.js'
import Swiper from 'Swiper'

import './Collocation.less'
let space = 20;
class Collocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '',
      isHiddenPageSpin: false,
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
            this.swiper.update()
          })
        } else {

        }

      })
      .catch((e) => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  /*
  */
  putCollectionData = (goodsId) => {
    //promptMsg
    let url = `${PUT_COLLECTION}/${goodsId}`
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            promptMsg: '收藏成功'
          })
        }
      })
      .catch((e) => {
        this.setState({
          promptMsg: '收藏失败'
        })
      })
      .then(() => {
        this.refs['prompt'].show()
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'icon-arrow-left')) {
      this.props.history.goBack()
      backToNativePage()
    } else if (target = getParentByClass(e.target, 'icon-share')) {
      this.refs['share'].show()
    } else if (target = getParentByClass(e.target, 'icon-collection')) {

      this.putCollectionData(target.getAttribute('data-id'))
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
                              <a className="img-wrap" href={`${BASE_PAGE_DIR}/underwear/${item.id}`}>
                                <div style={{backgroundImage: `url(${item.thumb_img})`}}/>
                              </a>
                              <div className="mix-intro">
                                <div className="mix-adjust">
                                  <p>{item.intro}</p>
                                </div>
                              </div>
                              <div className="iconfont icon-collection" data-id={item.id}/>
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
          ref="share"
          url={window.location.href}
          title={this.state.match.match_title}
          description={this.state.match.match_intro}
          imgUrl={this.state.match.match_img}
        />
        <Prompt ref="prompt" msg={this.state.promptMsg}/>
      </div>
    )
  }
}

module.exports = Collocation
