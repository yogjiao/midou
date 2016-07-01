import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
let update = require('react-addons-update')

import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ShareToSocialMedia from 'ShareToSocialMedia/ShareToSocialMedia.js'
import {
  getMiDouToken
} from 'commonApp.js'
import {
  FETCH_GOOD,
  FETCH_STATUS_NO_MORE_PRODUCT,
  PUT_TO_CART,
  BASE_PAGE_DIR,
  FETCH_SUCCESS,
  PUT_COLLECTION,
  DELETE_COLLECTION,
  FETCH_COLLECTIONS_STATE,
  CUSTMER_SERVICE_ID
} from 'macros.js'
import errors from 'errors.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {getParentByClass, pick} from 'util.js'

import UnderweardetailBanner from 'UnderweardetailBanner.js'
import UnderweardetailInfo from 'UnderweardetailInfo.js'
import UnderweardetailFooter from 'UnderweardetailFooter.js'
import UnderwearSelectPanel from 'UnderwearSelectPanel/UnderwearSelectPanel.js'
import {
  backToNativePage,
  receiveNotificationsFromApp,
  getUserInfoFromApp,
  calloutNewWebview
} from 'webviewInterface.js'
import CartEntry from 'CartEntry.js'
import ua from 'uaParser.js'
let  reactMixin = require('react-mixin')
import * as detailMixins from 'mixins/underwearDetail.js'

class Underweardetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedData: false,
      buyActionModel: 0, //[加入购物车，立即购买]
      isFetching: false,
      isHaveGoods: true,
      isHiddenPageSpin: false,
      isHiddenSelectPanel: true,
      isHiddenSharePanel: true,
      promptMsg: '',

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
  getChildContext = () => {
    return {
      productId: this.props.params.productId
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
        return [nextState.goods.id]
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
  /**
   * arrow function must end with semicolon, if not the wepback compile will error
   * add product to shopping car handler
   */

  postDataToCartHandler = () => {
    let data = this.getPostToCartData()
    let url = `${PUT_TO_CART}/${this.state.buyActionModel}`
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (this.state.buyActionModel == 1) {
            // this.props.history.push()
            // this.props.history.goForward()
            calloutNewWebview({url:`${window.location.origin}${BASE_PAGE_DIR}/order-created/${data.cid}`})
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
  /**
   * @param ids {Array}
   */
  freshCollectionBtnState = (ids) => {
    ids = ids.join()
    let url = `${FETCH_COLLECTIONS_STATE}/${ids}`
    return fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (this.state.goods.id == data.collect[0].id) {
            this.state.goods.isCollected = true
            this.forceUpdate();
          }

        } else {

        }
      })
      .catch((e) => {
      })
  };
  /*
  */
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
        if (this.state.goods.id == gid) {
          this.state.goods.isCollected = isCancel? false : true
          this.forceUpdate();
          this.refs['prompt'].show()
        }

      })
  };
  processMinus = (count) => {
    let len = this.state.boxes.length;
    let rest = count
    for (let i = len - 1; i >= 0; i--) {
      let box = this.state.boxes[i]
      rest = box.count - count
      if (rest >= 0 ) {
          box.count -= count
          break
      } else {
        box.count = 0;
      }
    }
  };


  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'push-to-collection')) {
      let isCancel = target.getAttribute('data-is-collected') == 'true'? true : false
      this.putCollectionData(target.getAttribute('data-id'), isCancel)
    } else if (target = getParentByClass(e.target, 'icon-share')) {
      this.refs['share'].show()
    }
  };
  /**
   * borwer back own step
   */
  backHandler = () => {
    backToNativePage()
      .then(() => {

      })

    this.props.history.goBack()
  };
  buyHandler = (e) => {
    let target,
        nextState
    if (target = getParentByClass(e.target, 'con-server')) {
      getUserInfoFromApp()
        .then((data) => {
          calloutNewWebview({url:`${window.location.origin}${BASE_PAGE_DIR}/im/${CUSTMER_SERVICE_ID}?productId=${this.props.params.productId}`})
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
  componentWillUpdate = (nextProps, nextState) => {
    switch (nextState.category) {
      case '1':
      if ((nextState.braSize && nextState.baseSize) &&
          (this.state.braSize != nextState.braSize ||
          this.state.baseSize != nextState.baseSize)) {
        nextState.boxes = this.rebuildBoxes(
          nextState.braSize, nextState.baseSize, nextState.goods)
      }

      if (this.state.count > nextState.count) {
        this.processMinus(1);
      }
        break;

    }
  };
  componentWillReceiveProps(nextProps){
    if (nextProps.params.productId != this.props.params.productId) {
      this.fetchDetailData(nextProps.params.productId)
      window.scrollTo(0,0)
    }
  }
  componentDidMount = () => {
    this.fetchDetailData(this.props.params.productId)

    receiveNotificationsFromApp((data, callback) => {
      if (data.type == '2') {
        this.refs['share'].show()
      }
    })

  };
  render() {
    return (
      <div className="uw-detail-container" onClick={this.thisHandler}>

        {
          ua.isApp()?
          '':
          (
            <PageHeader headerName="产品详情" isHiddenBottomBorder={true}>
              <div className="iconfont icon-arrow-left" onClick={this.backHandler}></div>
              <div className="iconfont icon-share"></div>
            </PageHeader>
          )
        }
        <UnderweardetailBanner img={this.state.goods.thumb_img_list}/>
        <UnderweardetailInfo {...this.state.goods}/>
        <UnderweardetailFooter
          buyHandler={this.buyHandler}
          isCollected={this.state.goods.isCollected}
          id={this.state.goods.id}
        />
        <CartEntry />
        <UnderwearSelectPanel
          isHidden={this.state.isHiddenSelectPanel}
          allBase={this.state.allBase}
          {...this.state}
          selectHandler={this.selectHandler.bind(this)}

        />
        <ShareToSocialMedia
          ref="share"
          url={window.location.href}
          title={this.state.goods.name}
          description={this.state.goods.match_intro}
          imgUrl={this.state.goods.share_img}
        />
        <Prompt msg={this.state.promptMsg} ref='prompt' />
        <PageSpin isHidden={this.state.isHiddenPageSpin} />
      </div>
    )
  }
}

Underweardetail.childContextTypes = {
  productId: React.PropTypes.string.isRequired
}


reactMixin(Underweardetail.prototype, detailMixins)



module.exports = Underweardetail
