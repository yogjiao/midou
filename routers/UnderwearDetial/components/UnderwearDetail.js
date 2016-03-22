import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
let update = require('react-addons-update')

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
import errors from 'errors.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {getParentByClass, pick} from 'util.js'

import UnderweardetailBanner from 'UnderweardetailBanner.js'
import UnderweardetailInfo from 'UnderweardetailInfo.js'
import UnderweardetailFooter from 'UnderweardetailFooter.js'
import UnderwearDetailSelectPanel from 'UnderwearDetailSelectPanel.js'
import {shareToSocialCircle, backToNativePage} from 'webviewInterface.js'


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
  rebuildInventory = (goodsInventory, category) => {
    let inventoryInfo = {}
    let allBase = inventoryInfo.allBase = {}
    let allSize = inventoryInfo.allSize = {}
    let inventory = inventoryInfo.inventory = {}
    if (category == '1') {
      goodsInventory.forEach((item, index)=>{
        let size = item.size.split('-');
        if (allBase[size[0]]) {
          allBase[size[0]].push(size[1])
        } else {
          allBase[size[0]] = []
          allBase[size[0]].push(size[1])
        }

        inventory[item.size] = item
      })
    } else {
      goodsInventory.forEach((item, index)=>{
        let size = item.size
        inventory[size] = item
      })
    }


    return inventoryInfo;
  };
  rebuildBoxes = (braSize, baseSize, goods) => {
    let inventory = goods.inventoryInfo.inventory
    let boxes = countBoxes(braSize, baseSize)
    boxes = boxes.filter((item, index)=>{
      let count
      try {
        count = inventory[item.baseSize + '-' + item.braSize].count
      } catch (e) {
        count = -1
      }
      return  count > 0
    })
    boxes.map((item, index) => {
      let temp = pick(goods, 'id', 'category')
      temp.size = item.baseSize + '-' + item.braSize
      // Object.assign({count: 1, try: 1, color: 0} , item)
       return Object.assign(item , temp, {count: 0, try: 1, color: 0});
    })

    return boxes
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
        size: this.state.goods.category == '1'?
          (this.state.baseSize + '-' + this.state.braSize) :
          this.state.size,
        try: 0,
        color: 0
      })
   if (this.state.category == '1') {
     let boxes = this.state.boxes.filter( item => {
       return item.count > 0
     })
     data.goods = data.goods.concat(boxes)
   }
   let url = `${PUT_TO_CART}/${this.state.buyActionModel}`
   fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (this.state.buyActionModel == 1) {
            this.props.history.push(`${BASE_PAGE_DIR}/order-created/${data.cid}`)
            this.props.history.goForward()
          }
          this.setState({promptMsg: '商品已添加到购物车'})
        } else if (data.rea == '2003'){
          this.setState({promptMsg: '你选择的型号没有库存了'})
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }

      })
      .catch((e) => {

      })
      .then(() => {
        this.refs['prompt'].show();
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
      rest = box.count - count
      if (rest >= 0 ) {
          box.count -= count
          break
      } else {
        box.count = 0;
      }
    }
  };
  getInventoryBySize = (size) => {
    return this.state.goods.inventoryInfo.inventory[size].count || 0;
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
        baseSize: {$set: target.getAttribute('data-value')},
        braSize: {$set: this.state.goods.inventoryInfo.allBase[target.getAttribute('data-value')][0]}
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
        nextState = update(this.state, {count: {$apply: (num) => Math.max(--num, 1)}})
      }
    } else if (target = getParentByClass(e.target, 'btn-add')) {
      //nextState = update(this.state, {num: {$apply: (num) => ++num}})
      let index = target.getAttribute('data-index')
      if (index) {
        let anotherIndex
        let anotherCount
        if (this.state.boxes.length == 1) {
          anotherCount = 0
        } else {
          anotherIndex = this.state.boxes.length - 1 - index;
          anotherCount = this.state.boxes[anotherIndex].count
        }
        let inventory =
          this.getInventoryBySize(this.state.boxes[index].size)
        let schema = {}
        schema[index] = {count: {
          $apply: (num) => {
            let rest = this.state.count - anotherCount
            if ( num == rest) {
              setTimeout(()=>{
                this.setState({promptMsg: errors['2008']})
                this.refs['prompt'].show()
              }, 10)
            }
            return Math.min(++num, rest)
          }
         }
        }

        nextState = update(this.state, {boxes: schema})
      } else {
        let size = this.state.category == '1'?
          (this.state.baseSize + '-' +this.state.braSize) :
          this.state.size
        let inventory =  this.getInventoryBySize(size)
        nextState = update(this.state, {count:
          {$apply: (num) => Math.min(++num, inventory)}})
      }
    } else if (target = getParentByClass(e.target, 'btn-post')) {
      nextState = update(this.state, {
        isHiddenSelectPanel: {$set: true}
      })
      this.postDataToCartHandler()
    } else if (target = (getParentByClass(e.target, 'close-select-panel') ||
      getParentByClass(e.target, 'bg-blur'))) {
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
          if (data.result == '1') {
            this.setState({promptMsg: '分享成功'})
          } else {
            this.setState({promptMsg: '分享失败'})
          }
        })
        .then(()=>{
          this.refs['prompt'].show()
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
    backToNativePage()
      .then(() => {

      })

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
          allBase={this.state.allBase}
          {...this.state}
          selectHandler={this.selectHandler}
        />
        <ShareToSocialMedia
          isHidden={this.state.isHiddenSharePanel}
        />
        <Prompt msg={this.state.promptMsg} ref='prompt'/>
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

module.exports = Underweardetail
