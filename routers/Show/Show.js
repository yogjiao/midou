import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import {
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR,
  FETCH_NICE_SHOW,
  DELETE_NICE_SHOW,
  PAGE_TO_PAGE_SIGNAL,
  FETCH_GOOD,
  PUT_TO_CART,
  CUSTMER_SERVICE_ID
} from 'macros.js'
import {
  getMiDouToken,
  getUserIdFromMidouToken
} from 'commonApp.js'
import {fetchable, fetchAuth, fetchOption} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')
import {getParentByClass} from 'util.js'
import ua from 'uaParser.js'
import ImageLayout from 'ImageLayout.js'
import Hammer from 'hammerjs'
import ShareToSocialMedia from 'ShareToSocialMedia/ShareToSocialMedia.js'
import Swiper from 'Swiper'
import NiceShowlayout from 'NiceShowlayout/NiceShowlayout.js'
import MoreMenu from 'MoreMenu.js'
import {
  backToNativePage,
  sendSignalToOtherPagesByOc,
  calloutNewWebview,
  getUserInfoFromApp,
  receiveNotificationsFromApp
} from 'webviewInterface.js'
import VideoPlayer from 'VideoPlayer/VideoPlayer.js'
let  reactMixin = require('react-mixin')
import * as detailMixins from 'mixins/underwearDetail.js'
import UnderweardetailBuyStack from 'UnderweardetailBuyStack/UnderweardetailBuyStack.js'
import UnderwearSelectPanel from 'UnderwearSelectPanel/UnderwearSelectPanel.js'

import './Show.less'
class Show extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isHiddenPageSpin: false,

      isHiddenConfirm: true,
      isHiddenMoreMenu: true,

      showData: {
        user: {},
        goods: [],
        img: [],
        video: {}
      },
      //goodsSelectedId: null,
      goodsSelectedIndex: 0,

      promptMsg: '',

      // for recommend underpants, it's the same to underwareDetail
      buyActionModel: 0,
      isHiddenSelectPanel: true,
      size: 0,
      allBase: [],
      braSize: 0, // bra
      baseSize: 0, // bra
      category: 1, // 1：文胸，2:底裤，3:情趣
      boxes: [], // tags
      count: 1,

      goods: {inventoryInfo:{allBase:[], allSize: [], inventory:{}}},
    };

  }
  fetchShowData = () => {
    let url = `${FETCH_NICE_SHOW}/${this.props.params.showId}`
    this.setState({isHiddenPageSpin: false})
    fetchOption(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (data.show.is_valid == 0) {
            data.show.img = [`${BASE_STATIC_DIR}/img/audit.png`]
          }
          this.setState({showData: data.show})// goodsSelectedId: data.show.goods[0].id

          this.fetchDetailData(data.show.goods[this.state.goodsSelectedIndex].id)
        } else {
          throw new Error(errors[data.rea])
        }

      })
      .catch((error) => {

      })
      .then(()=>{
        this.setState({
          isHiddenPageSpin: true,
          //isHiddenScrollingSpin: true
        })
      })
  };
  deleteNiceShow = () => {
    let url = `${DELETE_NICE_SHOW}/${this.props.params.showId}`
    this.setState({isHiddenPageSpin: false})
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState({promptMsg: '删除成功'})
          setTimeout(() => {
            backToNativePage()
          }, 3000)

          let signal = {
            signal: PAGE_TO_PAGE_SIGNAL.UPDATE_SHOWS
          }
          sendSignalToOtherPagesByOc(signal)
        } else {
          throw new Error(errors[data.rea])
        }

      })
      .catch((error) => {
        this.setState({promptMsg: error.message})
      })
      .then(()=>{
        this.setState({
          isHiddenPageSpin: true
        })

        this.refs['prompt'].show()
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'icon-ellipsis')) {
      this.setState({isHiddenMoreMenu: false})
    } else if (target = getParentByClass(e.target, 'icon-share')) {
      this.setState({isHiddenMoreMenu: true})
      this.refs['share'].show()
    } else if (target = getParentByClass(e.target, 'icon-delete')) {
      this.setState({isHiddenMoreMenu: true, isHiddenConfirm: false})

    } else if (target = getParentByClass(e.target, 'matching-card')) {
      let index = target.getAttribute('data-index')

      this.setState({goodsSelectedIndex: index})
      this.fetchDetailData(this.state.showData.goods[this.state.goodsSelectedIndex].id)
    }
  };
  postDataToCartHandler = () => {
    let data = this.getPostToCartData()
    let url = `${PUT_TO_CART}/${this.state.buyActionModel}`
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (this.state.buyActionModel == 1) {
            // this.props.history.push()
            // this.props.history.goForward()
            if (ua.isApp()) {
              calloutNewWebview({url:`${window.location.origin}${BASE_PAGE_DIR}/order-created/${data.cid}/${this.state.buyActionModel}`})
            } else {
              window.location.href = `${window.location.origin}${BASE_PAGE_DIR}/order-created/${data.cid}/${this.state.buyActionModel}`
            }

          } else {
            this.setState({promptMsg: '商品已添加到购物车'})
          }

        } else {
          this.setState({promptMsg: errors[data.rea]})
        }

      })
      .catch((e) => {
        this.setState({promptMsg: errors[e.rea]})
      })
      .then(() => {
        this.refs['prompt'].show();
      })

  };
  buyHandler = (e) => {
    let target,
        nextState
    if (target = getParentByClass(e.target, 'con-server')) {
      getUserInfoFromApp()
        .then((data) => {
          calloutNewWebview({url:`${window.location.origin}${BASE_PAGE_DIR}/im/${CUSTMER_SERVICE_ID}?productId=${this.state.showData.goods[this.state.goodsSelectedIndex].id}`})
        })
        .catch((error) => {
          this.setState({promptMsg: errors[error.rea]})
          this.refs['prompt'].show()
        })
    } else if (target = getParentByClass(e.target, 'push-to-cart')) {
      nextState = update(this.state, {
        isHiddenSelectPanel: {$set: false},
        buyActionModel: {$set: 0}
      })
    } else if (target = getParentByClass(e.target, 'buy-now')) {
      nextState = update(this.state, {
        isHiddenSelectPanel: {$set: false},
        buyActionModel: {$set: 1}
      })
    }
    nextState && this.setState(nextState)
  };
  moreMenuHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'cancel-selection')) {
      this.setState({isHiddenMoreMenu: true})
    }
  };
  confirmHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'btn-cancel')) {
      this.setState({isHiddenConfirm: true})
    } else if (target = getParentByClass(e.target, 'btn-confirm')) {
      this.setState({isHiddenConfirm: true})
      this.deleteNiceShow()

    }
  };
  fetchDetailData = (productId) => {
    this.state.isFetching = true
    //this.setState({isHiddenPageSpin: false})
    let url = `${FETCH_GOOD}/${productId}`
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHaveGoods = false
        }

        data.goods.inventoryInfo =
          this.rebuildInventory(data.goods.inventory, data.goods.category)
        delete data.goods.inventory

        let schema = {
          category: {$set: data.goods.category},
          goods: {$set: data.goods},
          isFetching:{$set: false},
          isHiddenPageSpin: {$set: true},
          hasLoadedData: {$set: true}
        }

        if (data.goods.category == '1') {
          let keys = Object.keys(data.goods.inventoryInfo.allBase)
          schema.allBase = {$set: keys}
          schema.baseSize = {$set: keys[0]}
          schema.braSize = {$set: data.goods.inventoryInfo.allBase[keys[0]][0]}
          //nextState.boxes = this.rebuildBoxes(nextState.braSize, nextState.baseSize, nextState.goods.inventoryInfo.inventory)
        } else {
          let keys = Object.keys(data.goods.inventoryInfo.inventory)
          schema.allSize = {$set: keys}
          schema.size = {$set: keys[0]}
        }
        let nextState = update(this.state, schema)
        this.setState(nextState)
        //return [nextState.goods.id]
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true
        })
      })
      .then((ids) => {
        if (getMiDouToken()) {
          this.freshCollectionBtnState(ids)
        }
      })
  };

  componentDidMount = () => {
    this.fetchShowData()
  //   this.bindGesture()
  //   //  document.addEventListener('scroll', this.handleScroll);
  //
  //
    var mySwiper = new Swiper('.matching-group', {
          slideClass: 'matching-card'
      });

    receiveNotificationsFromApp((data, callback) => {
      if (data.type == '2') {// refresh nices
        this.refs['share'].show()
      }
    })

  };
  componentWillUnmount = () => {
  };
  render() {
    let goodsInfo = {}

    try {
      goodsInfo = this.state.showData.goods[this.state.goodsSelectedIndex] || {}
    } catch (e) {}

    return (
      <div className="show-container" onClick={this.thisHandler}>
        <div className="adjust-container">
          <NiceShowlayout goodsSelectedId={goodsInfo.id}>
            {
              this.state.showData.video ?
                <VideoPlayer {...this.state.showData.video} /> :
                <ImageLayout images={this.state.showData.img}/>
            }
            <div className="user-wrap">
              <div className="avatar" style={{backgroundImage: `url(${this.state.showData.user.headimg})`}}></div>
              <div className="user-name single-ellipsis">{this.state.showData.user.name}</div>

              <i className="iconfont icon-ellipsis" />
            </div>
            <div className="user-comment">
                {this.state.showData.comment}
            </div>
            <div className="matching-group">
              <div className="swiper-wrapper">
                {
                  this.state.showData.goods.map((item, index) => {
                    return  (
                      <div
                        className={this.state.goodsSelectedIndex == index? 'matching-card on' : 'matching-card'}
                        data-index={index}
                        data-id={item.id}
                      >
                        <div className="card-bg" key={index} style={{backgroundImage: `url(${item.main_img})`}}></div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="underwear-wrap">
              <div className="underwear-bg"
                style={{backgroundImage: `url(${goodsInfo.main_img})`}}
              ></div>
            <div className="underwear-name">{goodsInfo.name}</div>
              <p className="underwear-price">&yen; {goodsInfo.price}</p>
            </div>
          </NiceShowlayout>
          <UnderweardetailBuyStack
            buyHandler={this.buyHandler}
            isCollected={this.state.goods.isCollected}
            id={this.state.goods.id}
            isHiddenCollection={true}
          />
        </div>
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
        <Confirm isHidden={this.state.isHiddenConfirm} thisHandler={this.confirmHandler}/>
        {
          this.state.isHiddenMoreMenu ? '' : <MoreMenu thisHandler={this.moreMenuHandler} userId={this.state.showData.user.id}/>
        }
        <ShareToSocialMedia
          ref="share"
          url={window.location.href}
          title={(this.state.showData.goods[0] || {}).name}
          description={this.state.showData.comment}
          imgUrl={this.state.showData.share_img}
        />
        <Prompt msg={this.state.promptMsg} ref='prompt'/>
        <UnderwearSelectPanel
          isHidden={this.state.isHiddenSelectPanel}
          allBase={this.state.allBase}
          {...this.state}
          selectHandler={this.selectHandler.bind(this)}

        />
      </div>
    )
  }
}
// Home.childContextTypes = {
//     pageSpin: React.PropTypes.node.isRequired
//   }
// Home.contextTypes = {
//     name: React.PropTypes.string.isRequired,
//     //router: React.PropTypes.func.isRequired
// }
// Home.context = {
//   //pageSpin: pageSpin
// }
reactMixin(Show.prototype, detailMixins)
module.exports = Show
