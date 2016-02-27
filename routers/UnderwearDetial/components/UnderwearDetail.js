import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {countBoxes} from 'commonApp.js'
import {FETCH_GOOD, FETCH_STATUS_NO_MORE_PRODUCT, POST_TO_CART} from 'macros.js'
import {fetchable, fetchAuth, fetchMock} from 'fetch.js'
import {getParentByClass, pick} from 'util.js'
let update = require('react-addons-update')

import UnderweardetailBanner from 'UnderweardetailBanner.js'
import UnderweardetailInfo from 'UnderweardetailInfo.js'
import UnderweardetailFooter from 'UnderweardetailFooter.js'
import UnderwearDetailSelectPanel from 'UnderwearDetailSelectPanel.js'
import {registerHandler, callHandler} from 'webviewInterface.js'

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
  addShoppingCartHandler = () => {
    this.refs['select-model'].show();
  };
  /**
   * buy immediately handler
   */
  buyNowHandler = () => {
    this.refs['select-model'].show();
  };
  /**
   * share with social circle
   */
  shareHanler = () => {
    callHandler(macros.SHARE_HANLER, {}, function(data){
      alert('分享成功了' + JSON.stringify(data))
    })
  };
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

   fetchMock(`${POST_TO_CART}`, {method: 'post', body: JSON.stringify(data)})
      .then(function(data){
        debugger;
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
    return target.count
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
    } else if (target = getParentByClass(e.target, 'btn-minus')) {
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
      this.postDataToCartHandler()
    } else if (target = getParentByClass(e.target, 'box-size')) {
    }
    nextState && this.setState(nextState)
  };
  /**
   * borwer back own step
   */
  backHandler = () => {
    this.props.history.goBack()
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
      <div className="uw-detail-container">
        <PageHeader headerName="产品详情">
          <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>
          <div className="menu-search" onClick={this.shareHanler}>分享</div>
        </PageHeader>
        <UnderweardetailBanner img={this.state.goods.thumb_img_list}/>
        <UnderweardetailInfo {...this.state.goods}/>
        <UnderweardetailFooter
          buyActionModel={this.state.buyActionModel}
          addShoppingCartHandler={this.addShoppingCartHandler}
          buyNowHandler={this.buyNowHandler}
        />
        <UnderwearDetailSelectPanel
          isHidden={this.state.isHiddenSearchPanel}
          {...this.state}
          selectHandler={this.selectHandler}
        />
      </div>
    )
  }
}

module.exports = Underweardetail
