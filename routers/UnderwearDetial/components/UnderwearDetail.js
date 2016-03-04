import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ShareToSocialMedia from 'ShareToSocialMedia/ShareToSocialMedia.js'
import {countBoxes} from 'commonApp.js'
import {
  FETCH_GOOD,
  FETCH_STATUS_NO_MORE_PRODUCT,
  PUT_TO_CART,
  BASE_PAGE_DIR,
  FETCH_SUCCESS,
  PUT_COLLECTION,
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {getParentByClass, pick} from 'util.js'
let update = require('react-addons-update')

import UnderweardetailBanner from 'UnderweardetailBanner.js'
import UnderweardetailInfo from 'UnderweardetailInfo.js'
import UnderweardetailFooter from 'UnderweardetailFooter.js'
import UnderwearDetailSelectPanel from 'UnderwearDetailSelectPanel.js'
import {shareToSocialCircle} from 'webviewInterface.js'

import './UnderwearDetail.less'
class Underweardetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyActionModel: 0, //[加入购物车，立即购买]
      isFetching: false,
      isHaveGoods: true,
      isHiddenPageSpin: false,
      isHiddenSelectPanel: true,
      isHiddenSharePanel: true,
      promptMsg: '',

      size: 0,
      braSize: 0, // bra
      baseSize: 0, // bra
      category: 1, // 1：文胸，2:底裤，3:情趣
      boxes: [], // tags
      count: 0,

      goods: {},
    };

  }
  fetchDetailData = () => {
    this.state.isFetching = true
    //this.setState({isHiddenPageSpin: false})
    let url = `${FETCH_GOOD}/${this.props.params.productId}`
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHaveGoods = false
        }
        let nextState = update(this.state, {
          category: {$set: data.goods.category},
          goods: {$set: data.goods},
          isFetching:{$set: false},
          isHiddenPageSpin: {$set: true}
        })
        this.setState(nextState)
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true
        })
      })
  };
  /**
   * arrow function must end with semicolon, if not the wepback compile will error
   * add product to shopping car handler
   */

  postDataToCartHandler = () => {
    let data = {goods: []}
    let temp = pick(this.state.goods, 'id', 'category')
    data.goods[0] =
      Object.assign(temp, {
        count: this.state.count,
        size: this.state.size ||
          (this.state.baseSize + '-' + this.state.braSize),
        try: 0,
        color: 0
      })
   let boxes = this.state.boxes.filter( item => {
     return item.count > 0
   })
   data.goods = data.goods.concat(boxes)

   fetchAuth(`${PUT_TO_CART}`, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (this.state.buyActionModel == 1) {
            this.props.history.push(`${BASE_PAGE_DIR}/carts/scan`)
            this.props.history.goForward()
          }
          this.setState({promptMsg: '商品已添加到购物车'})
          this.refs['prompt'].show();
        } else if (data.rea == '2003'){
          this.setState({promptMsg: '你选择的型号没有库存了'})
          this.refs['prompt'].show();
        }

      })
      .catch((e) => {

      })
      .then(() => {

      })

  };
  /*
  */
  putCollectionData = () => {
    //promptMsg
    let url = `${PUT_COLLECTION}/${this.state.goods.id}`
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
  processMinus = (count) => {
    let len = this.state.boxes.length;
    let rest = count
    for (let i = len - 1; i >= 0; i--) {
      let box = this.state.boxes[i]
      rest = count - box.count
      if (rest <= 0 ) {
          box.count = box.count - count
          break
      } else {
        box.count = 0;
      }
    }
  };
  getInventoryBySize = (size) => {
    let target =
      this.state.goods.inventory.find( (item, index) => {
        return item['size'] == size;
      })
    return target && target.count || 0
  };
  selectHandler = (e) => {
    let target,
        nextState

    if (target = getParentByClass(e.target, 'bra-size')) {
      nextState = update(this.state, {
        braSize: {$set: target.getAttribute('data-value')}
      })
    } else if (target = getParentByClass(e.target, 'base-size')) {
      nextState = update(this.state, {
        baseSize: {$set: target.getAttribute('data-value')}
      })
    } else if (target = getParentByClass(e.target, 'no-bra-size')) {
      nextState = update(this.state, {
        size: {$set: target.getAttribute('data-value')}
      })
    }else if (target = getParentByClass(e.target, 'btn-minus')) {
      let index = target.getAttribute('data-index')
      if (index) {
        let schema = {}
        schema[index] = {count: {
          $apply: (num) => Math.max(--num, 0)
         }
        }
        nextState = update(this.state, {boxes: schema})
      } else {
        nextState = update(this.state, {count: {$apply: (num) => Math.max(--num, 0)}})
      }
    } else if (target = getParentByClass(e.target, 'btn-add')) {
      //nextState = update(this.state, {num: {$apply: (num) => ++num}})

      let index = target.getAttribute('data-index')
      if (index) {
        let anotherIndex = this.state.boxes.length - 1 - index;
        let inventory =
          this.getInventoryBySize(this.state.boxes[index].size)
        let schema = {}
        schema[index] = {count: {
          $apply: (num) => {
            let anotherCount = this.state.boxes[anotherIndex].count
            return Math.min(++num, (this.state.count - anotherCount))
          }
         }
        }
        nextState = update(this.state, {boxes: schema})
      } else {
        let inventory =
          this.getInventoryBySize(this.state.size ||
            (this.state.baseSize + '-' + this.state.braSize))
        nextState = update(this.state, {count:
          {$apply: (num) => Math.min(++num, inventory)}})
      }
    } else if (target = getParentByClass(e.target, 'btn-post')) {
      nextState = update(this.state, {
        isHiddenSelectPanel: {$set: true}
      })
      this.postDataToCartHandler()
    } else if (target = getParentByClass(e.target, 'close-select-panel')) {
      nextState = update(this.state, {
        isHiddenSelectPanel: {$set: true}
      })
    }
    nextState && this.setState(nextState)
  };
  thisHandler = (e) => {
    let target
    let nextState = {}
    if (target = getParentByClass(e.target, 'push-to-collection')) {
      this.putCollectionData()
    } else if (target = getParentByClass(e.target, 'menu-share')) {
      nextState.isHiddenSharePanel = false
    } else if (target = getParentByClass(e.target, 'media-item')) {
      // "type": "微博,QQ,朋友圈,微信朋友",
      //         "url": "网址",
      //         "title": "这是标题",
      //         "description": "这是描述",
      //         "imgUrl": "http://www.baidu.com"
      let goods = this.state.goods
      let type = target.getAttribute('data-type')
      let data = {}
      data.type = type
      data.url = window.location.href
      data.title = goods.name
      data.description = goods.match_intro
      data.imgUrl = goods.main_img
      shareToSocialCircle(data)
        .then( (data) => {
          alert('分享成功了')
        })
      nextState.isHiddenSharePanel = true
    } else if (target = getParentByClass(e.target, 'cancel-shrare')) {
      nextState.isHiddenSharePanel = true
    }
    nextState && this.setState(nextState)
  };
  /**
   * borwer back own step
   */
  backHandler = () => {
    this.props.history.goBack()
  };
  buyHandler = (e) => {
    let target,
        nextState

    if (target = getParentByClass(e.target, 'push-to-cart')) {
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
    switch (this.state.category) {
      case '1':
      if ((nextState.braSize && nextState.baseSize) &&
          (this.state.braSize != nextState.braSize ||
          this.state.baseSize != nextState.baseSize)) {
        nextState.boxes = countBoxes(nextState.braSize, nextState.baseSize)
        nextState.boxes.map((item, index) => {
          let temp = pick(this.state.goods, 'id', 'category')
          temp.size = item.baseSize + '-' + item.braSize
          // Object.assign({count: 1, try: 1, color: 0} , item)
           return Object.assign(item , temp, {count: 0, try: 1, color: 0});
        })
      }

      if (this.state.count > nextState.count) {
        this.processMinus(1);
      }
        break;

    }
  };

  componentDidMount = () => {
    this.fetchDetailData()
  };
  render() {
    return (
      <div className="uw-detail-container" onClick={this.thisHandler}>
        <PageHeader headerName="产品详情">
          <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>
          <div className="menu-share">分享</div>
        </PageHeader>
        <UnderweardetailBanner img={this.state.goods.thumb_img_list}/>
        <UnderweardetailInfo {...this.state.goods}/>
        <UnderweardetailFooter
          buyHandler={this.buyHandler}
        />
        <UnderwearDetailSelectPanel
          isHidden={this.state.isHiddenSelectPanel}
          {...this.state}
          selectHandler={this.selectHandler}
        />
        <ShareToSocialMedia
          isHidden={this.state.isHiddenSharePanel}
        />
        <Prompt msg={this.state.promptMsg} ref='prompt'/>
      </div>
    )
  }
}

module.exports = Underweardetail
