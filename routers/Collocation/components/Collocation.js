import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_MATCH_GOODS,
  PUT_COLLECTION,
  FETCH_SUCCESS,
  FETCH_COLLECTIONS_STATE,
  DELETE_COLLECTION
} from 'macros.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'
import {getParentByClass} from 'util.js'
import ShareToSocialMedia from 'ShareToSocialMedia/ShareToSocialMedia.js'
import Prompt from 'Prompt/Prompt.js'
import Swiper from 'Swiper'
import ua from 'uaParser.js'
import errors from 'errors.js'

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
            this.swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: space,
                width: window.innerWidth - space * 4
            });
          })
        } else {
          this.setState({
            promptMsg: errors[data.rea]
          })
        }
        return data.goods || [];
      })
      .then((goods) => {
        let ids = goods.map((item) => {
          return item.id
        })
        if(ua.isApp()){
          this.freshCollectionBtnState(ids)
        }
      })
      .catch((e) => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  /*
  */
  putCollectionData = (goodsId, isCancel) => {
    //promptMsg
    let url
    if(isCancel) {
      url  = `${DELETE_COLLECTION}/${goodsId}`
    } else {
      url  = `${PUT_COLLECTION}/${goodsId}`
    }
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            promptMsg: isCancel? '收藏已取消' : '收藏成功'
          })
        } else {
          this.setState({
            promptMsg: errors[data.rea]
          })
        }
        return data.gid
      })
      .catch((e) => {
        this.setState({
          promptMsg: isCancel? '取消收藏失败' : '收藏失败'
        })
      })
      .then((gid) => {
        this.state.goods.map((item, index) => {
          if (item.id == gid) {
            item.isCollected = isCancel? false : true
          }
        })
        this.setState()
        this.refs['prompt'].show()
      })
  };
  /**
   * @param ids {Array}
   */
  freshCollectionBtnState = (ids) => {
    ids = ids.join()
    let url = `${FETCH_COLLECTIONS_STATE}/${ids}`
    return fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.state.goods.map((item, index) => {
            let temp = data.collect.find((item_1, index_1) => {
              return item.id == item_1.id
            })
            if(temp) {
              item.isCollected = true
            }
            return item
          })
          this.setState({});
        } else {

        }
      })
      .catch((e) => {
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
      let isCancel = target.getAttribute('data-is-collected') == 'true'? true : false
      this.putCollectionData(target.getAttribute('data-id'), isCancel)
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
  };
  render() {
    let h = window.innerHeight;
    let style = {
      backgroundImage: `url(${this.state.match.match_img})`,
      height: h
    }
    return (
        <div className="collocation-container" onClick={this.thisHandler}>
        <PageHeader headerName={this.state.headerName}>
          <div className="iconfont icon-arrow-left"></div>
          <div className="iconfont icon-share"></div>
        </PageHeader>
        <div className="collocation-wrap" style={style}>
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
                            <div
                              data-id={item.id}
                              data-is-collected={item.isCollected}
                              className={item.isCollected?
                                'iconfont icon-collection on' :
                                'iconfont icon-collection'}
                            />
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
        <PageSpin isHidden={this.state.isHiddenPageSpin} />
      </div>
    )
  }
}

module.exports = Collocation
