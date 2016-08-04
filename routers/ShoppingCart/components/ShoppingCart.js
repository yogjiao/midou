import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import ShoppingCartGroup from 'ShoppingCartGroup.js'
import UnderwearSelectPanel from 'UnderwearSelectPanel/UnderwearSelectPanel.js'
import {
    BASE_PAGE_DIR,
    SCAN,
    EDIT,
    FETCH_SUCCESS,
    FETCH_CARTS,
    FETCH_STATUS_NO_MORE_PRODUCT,
    PUT_BOX_SERVICE,
    DELETE_BOX_SERVICE,
    EDIT_CART_GOODS,
    DELETE_CART_GOODS,
    PAGE_TO_PAGE_SIGNAL,
    PUT_TO_CART
  } from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {getParentByClass} from 'util.js'
import {
  getMiDouToken
} from 'commonApp.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import errors from 'errors.js'
import ShoppingCartNoResult from 'ShoppingCartNoResult.js'
import UnderpantsRecommendation from 'UnderpantsRecommendation/UnderpantsRecommendation.js'
let update = require('react-addons-update');
import uaParser from 'uaParser.js'
import MatchDiscount from 'MatchDiscount/MatchDiscount.js'
import {
  backToNativePage,
  receiveNotificationsFromApp,
  recievePageToPageSignal
} from 'webviewInterface.js'
import Nav from 'Nav/Nav.js'
let  reactMixin = require('react-mixin')
import * as detailMixins from 'mixins/underwearDetail.js'

import './ShoppingCart.less'
class ShoppingCart extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props)
    this.state = {
      actionModel: SCAN
    }
    this.initState()
  }
  /**
   *  initial state when actionModel changed
   */
  initState = (state = {}) => {

    return Object.assign(this.state, {
      selectedIds: [],
      goodList: [],
      totalPrice: 0,
      isSelectedAll: false,
      itemType: -1, // 0: deleteProduct 1: deleteBox
      promptMsg: '',
      confirmMsg: '你确定要删除该产品吗？',
      lastGoodsId: 0,
      pageSize: 10,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isHiddenConfirm: true,
      isFetching: false,
      isHaveGoods: true,
      isNull: false,

      isDiscountFive: false,

      // for recommend underpants, it's the same to underwareDetail
      isHiddenSelectPanel: true,
      size: 0,
      allBase: [],
      braSize: 0, // bra
      baseSize: 0, // bra
      category: 1, // 1：文胸，2:底裤，3:情趣
      boxes: [], // tags
      count: 1,

      goods: {inventoryInfo:{allBase:[], allSize: [], inventory:{}}},
    }, state)

  };
  postDataToCartHandler = () => {
    let data = this.getPostToCartData()
    let url = `${PUT_TO_CART}/0`
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let index = -1
          index = this.state.goodList.findIndex((item, index) => {
            return item.id == data.cart[0].id
          })

          let range
          if (index == -1) {
            range = [0, 0].concat(data.cart)
          } else {
            range = [index, 1].concat(data.cart)
          }

          let nextState = update(this.state, {goodList: {$splice: [range]}})
          this.setState(nextState)
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }

      })
      .catch((e) => {
        this.setState({promptMsg: errors[e.rea]})
      })

  };
  /**
   * flat the box service data based on item.count
   * eg: [{count: 2, ...}] => [{count: 1, ...}, {count: 1, ...}]
   */
  flatBoxServiceData = (goodList) => {
    return goodList.map((item, index, list) => {
      item.goods = item.goods.reduce((p, c, ci) => {
       if (ci == 0) {
          p = p.concat(c)
       } else {
         let count
         try{
           count = parseInt(c.count)
         }catch(e){
           count = 0;
         }
         for (let i = 1; i <= count; i++) {
           let temp = update({}, {$merge: c})
           temp.count = 1
           p = p.concat(temp)
         }
       }
       return p

     }, [])
     return item;
    })
  };
  /**
   *  get schema to update this.state.goodList
   *
   * @param groupId {number}
   * @param itemId [number] optianal
   * @param operateSchema {Object} eg: {cup: {$set: 'A'}, bottom_bust: {$set: 75}}
   *
   * eg: update(this.state.goodList, {1: {goods: {1: {cup: {$set: '75C'}}}}})
   */
  getUpdateSchema = (groupId, itemId, operateSchema) => {
    let schema = {}
    let temp = schema
    let keys = ['goodList']//['goodList', groupId, 'goods', itemId]

    if (typeof itemId == 'undefined') {
      operateSchema = groupId
    } else if (typeof operateSchema == 'undefined') {
      operateSchema = itemId
      keys = keys.concat([groupId, 'goods'])
    } else {
      keys = keys.concat([groupId, 'goods', itemId])
    }
    keys.forEach((item, index) => {
       let holder = index == (keys.length - 1)? operateSchema :　{};
       temp = temp[item] = holder
    })

    return schema
  };
  /**
   *
   */
  getDataByIndexPath = (groupId, itemId) => {
    let target = this.state.goodList;
    target = target[groupId]
    if (itemId) {
      target = target.goods[itemId]
    }
    return target
  };
  /**
   * calculate all product price
   * @param nextState [Object] optianal
   */
  calculateTotalPrice = (goodList) => {
    let price = 0;
    let isHasCategoryOne = false
    let isHasCategoryTowOrThree = false
    let isDiscountFive = false
    goodList = goodList || this.state.goodList
    /*
      1：文胸，2:底裤，3:情趣

      搭配购的优惠组合是：
      内衣＋底裤
      情趣＋底裤
    */
    goodList.forEach((item, index) => {
      let isSelected = item.goods[0].isSelected
      if (!isSelected) {
        return
      }
      if (item.goods[0].category == 2) {
        isHasCategoryOne = true
      }
      if (item.goods[0].category == 1 || item.goods[0].category == 3) {
        isHasCategoryTowOrThree = true
      }
      item.goods.forEach((item, index) => {
        if (index == 0) {
          price += item.price * item.count
        } else {
          price += item.deposit * item.count
        }
      })
    })
    //nextState = update(this.state, {totalPrice: {$set: price}})
    //this.setState(nextState)

    if (isHasCategoryOne &&　isHasCategoryTowOrThree) {
      price = price - 5
      isDiscountFive = true
    }

    return {price: new Number(price).toFixed(2), isDiscountFive: isDiscountFive};
  };
  /**
   * unselect all item
   */
  selectAll = (nextState) => {
    nextState = nextState || this.state
    nextState.goodList.forEach((item, index) => {
      item.goods[0].isSelected = true
    })
  };
  /**
   * unselect all item
   */
  unselectAll = (nextState) => {
    nextState = nextState || this.state
    nextState.goodList.forEach((item, index) => {
      item.goods[0].isSelected = false
    })
  };
  /**
   * trigger select all items
   */
  triggerSelectAll = (nextState) => {
    if (nextState.isSelectedAll) {
      this.selectAll(nextState)
    } else {
      this.unselectAll(nextState)
    }
  };

  /**
   * get groupId and itemId from target's attribute;
   */
  getTargetDataAttres = (target) => {
    return {
      groupId: target.getAttribute('data-group-id'), // group index
      itemId: target.getAttribute('data-item-id'), // item index
      itemType: target.getAttribute('data-item-type'),// item 0  no-try 1 try
      baseSize: target.getAttribute('data-base-size'),
      braSize: target.getAttribute('data-bra-size'),
      cgid: target.getAttribute('data-cgid')
    }
  };
  assignDataPramas = (target) => {
    Object.assign(this, this.getTargetDataAttres(target))
  };
  fetchCartData = (isScrollingFetch = false) => {
     let url = `${FETCH_CARTS}/${this.state.lastGoodsId}/${this.state.pageSize}`
     let nextState = {
       isFetching: true,
       isHiddenScrollingSpin: isScrollingFetch? false : true,
       isHiddenPageSpin: isScrollingFetch? true : false
     }

     this.setState(nextState)

     fetchAuth(url)
       .then((data) => {
         if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
           this.state.isHaveGoods = false
           if (this.state.lastGoodsId == 0) {
             this.setState({isNull: true})
           }
         } else if (data.rea == FETCH_SUCCESS) {
           let splice = [this.state.goodList.length, 0].concat(data.cart)
           let nextState = update(this.state, {
             goodList: {$splice: [splice]}
           })
           nextState.lastGoodsId = data.cart.slice(-1)[0].id
           this.setState(nextState)
         }

       })
       .catch((error) => {
        // debugger;
       })
       .then(() => {
         this.setState({
           isFetching: false,
           isHiddenPageSpin: true,
           isHiddenScrollingSpin: true
         })
       })

  };
  editCartGoods = (delta) => {
    let itemData = this.getDataByIndexPath(this.groupId, this.itemId)
    let group = this.state.goodList[this.groupId]
    let cid = group.id
    let cgid = itemData['cgid']
    let url = `${EDIT_CART_GOODS}/${cid}/${cgid}`
    let nextState = {isFetching: true, isHiddenPageSpin: false}
    this.setState(nextState)

    let data = {
        "cid": cid,
        "cgid": cgid,
        "gid": itemData.gid,
        "count": (parseInt(itemData.count) + delta),
        "color": 0,
        "size": itemData.size,
        "category": itemData.category,
        "try": itemData.try
     }

    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})// 哥需要价格
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let schema = this.getUpdateSchema(this.groupId, {$splice: [[this.itemId, 1, data.goods]]})
          let nextState = update(this.state, schema)
          this.setState(nextState)
        } else {
          this.setState({promptMsg: errors[data.rea]})
          this.refs['prompt'].show()
        }
      })
      .catch((error) => {
      })
      .then((data)=>{
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
        })
      })
  };
  putBoxService = () => {
    //let itemData = this.getDataByIndexPath(this.groupId, this.itemId)
    let group = this.state.goodList[this.groupId]
    let cid = group.id
    let cgid = group['goods'][0]['cgid'] //ntid
    let url = `${PUT_BOX_SERVICE}/${cid}/${cgid}`
    let nextState = {isFetching: true, isHiddenPageSpin: false}
    this.setState(nextState)

    let data = {
        "id": group['goods'][0]['gid'],
        "count": 1,
        "color": 0,
        "size": `${this.baseSize}-${this.braSize}`,
        "category": group['goods'][0]['category'],
        "try": 1
     }

    fetchAuth(url, {method: 'post', body: JSON.stringify({goods: [data]})})// 哥需要价格
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let schema = this.getUpdateSchema(this.groupId,
            {$splice: [[group.goods.length, 0, data.goods]]})
          let nextState = update(this.state, schema)
          this.setState(nextState)
        } else {
          this.setState({promptMsg: errors[data.rea]})
          this.refs['prompt'].show()
        }
      })
      .catch((error) => {
      })
      .then((data)=>{
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
        })
      })

  };
  /**
   * 购物车记录id (cart id)
   * 购物车记录里非试穿id (not try id)
   * 购物车记录里试穿id (try id)
   */
  deleteBoxService = () => {
    let group = this.state.goodList[this.groupId]
    let cid = group.id
    let ntid = group['goods'][0]['cgid']
    let tid = group['goods'][this.itemId]['cgid']
    let url = `${DELETE_BOX_SERVICE}/${cid}/${ntid}/${tid}`
    let nextState = {isFetching: true, isHiddenPageSpin: false}
    this.setState(nextState)
    fetchAuth(url)
      .then((data) => {
        if (data.rea ==  FETCH_SUCCESS) {
          let schema = this.getUpdateSchema(this.groupId, {$splice: [[this.itemId, 1]]})
          let nextState = update(this.state, schema)
          this.setState(nextState)

        } else {
          this.setState({promptMsg: errors[data.rea]})
          this.refs['prompt'].show()
        }
      })
      .catch((error) => {
      })
      .then((data)=>{
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
        })
      })

  };
  deleteCartGoods = () => {
    let groupId = parseInt(this.groupId)
    let cid = this.state.goodList[groupId].id
    let url = `${DELETE_CART_GOODS}/${cid}`
    let nextState = {
      isFetching: true,
      isHiddenPageSpin: false
    }
    this.setState(nextState)

    fetchAuth(url, {method: 'post'})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let schema = this.getUpdateSchema({$splice: [[groupId, 1]]})
          let nextState = update(this.state, schema)
          nextState.promptMsg = '商品已删除'
          this.setState(nextState)
          this.refs['prompt'].show();
        } else {
          this.setState({promptMsg: errors[data.rea]})
          this.refs['prompt'].show()
        }
      })
      .catch((error) => {
      })
      .then((data)=>{
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
        })
      })
  };
  /**
   * for edit mostly
   */
  thisHandler = (e) => {
    let target,
        nextState;

    if (target = getParentByClass(e.target, 'btn-post')) {
      if (this.buyActionModel == 0) {// add product to shopping cart

      } else {// buy now

      }
      return
    }
    if (target = getParentByClass(e.target, 'btn-scan-carts')) {
      this.initState({actionModel: SCAN})
      this.switchHeader()
      this.fetchCartData()
    } else if (target = getParentByClass(e.target, 'btn-edit-carts')) {
      this.initState({actionModel: EDIT})
      this.switchHeader()
      this.fetchCartData()
    } else if (target = getParentByClass(e.target, 'btn-add')) {
       this.assignDataPramas(target)
       if (this.itemId == '-1') {
        this.putBoxService()
       } else {
        this.editCartGoods(1)
       }

    } else if (target = getParentByClass(e.target, 'btn-minus')) {
      this.assignDataPramas(target)
      if (this.itemId == '-1') return
      let itemData = this.getDataByIndexPath(this.groupId, this.itemId)
      if (this.itemId == '0') {
        if (itemData.count < 2) return
        this.editCartGoods(-1)
      } else {
        if (itemData.count < 1) return
        if (itemData.count < 2) {
          this.deleteBoxService()
        } else {
          this.editCartGoods(-1)
        }
      }
    } else if (target = getParentByClass(e.target, 'select-radio')) {//isSelected
      this.assignDataPramas(target)
      let schema = this.getUpdateSchema(this.groupId, this.itemId,
            {isSelected: {$apply: val => !val }})

      nextState = update(this.state, schema)

      if (this.state.goodList[this.groupId].goods[this.itemId].isSelected &&
          this.state.isSelectedAll) {
        nextState.isSelectedAll = false
      }

    } else if (target = getParentByClass(e.target, 'select-all')) {

      nextState = update(this.state, {isSelectedAll: {$apply: val => !val}})
      this.triggerSelectAll(nextState)

    } else if (target = getParentByClass(e.target, 'btn-delete')) {
      let {groupId, itemId, itemType} = this.getTargetDataAttres(target)
      this.groupId = groupId
      this.itemId = itemId
      this.setState({isHiddenConfirm: false})
      //nextState = update(this.state, {itemType: {$set: parseInt(itemType)}})

    } else if (target = getParentByClass(e.target, 'btn-check-out')) {
      if (this.state.totalPrice == 0) {
        nextState = update(this.state, {promptMsg: {$set: '请至少选择一件商品'}})
        this.refs['prompt'].show();

        e.preventDefault()
      }
    } else if (target = getParentByClass(e.target, 'ur-card')) {
      let index = target.getAttribute('data-index')
      let goods = this.refs.recommend.state.recommends[index]
      goods.inventoryInfo =
        this.rebuildInventory(goods.inventory, goods.category)

      let schema = {
        category: {$set: goods.category},
        goods: {$set: goods},
        isHiddenSelectPanel: {$set: false}
      }

      if (goods.category == '1') {
        let keys = Object.keys(goods.inventoryInfo.allBase)
        schema.allBase = {$set: keys}
        schema.baseSize = {$set: keys[0]}
        schema.braSize = {$set: goods.inventoryInfo.allBase[keys[0]][0]}
        //nextState.boxes = this.rebuildBoxes(nextState.braSize, nextState.baseSize, nextState.goods.inventoryInfo.inventory)
      } else {
        let keys = Object.keys(goods.inventoryInfo.inventory)
        schema.allSize = {$set: keys}
        schema.size = {$set: keys[0]}
      }
      nextState = update(this.state, schema)
    //  this.setState(nextState)
    }

    nextState && this.setState(nextState)
  };
  handleScroll = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      if (this.state.isHaveGoods && !this.state.isFetching){
        this.setState({isHiddenScrollingSpin: false})
        this.state.pageIndex++
        this.fetchCartData(true)
      }
    }
  };
  /**
   *  delete product item
   */
  deleteProductHandler = () => {
    //this.itemId
    this.setState({isHiddenConfirm: true})
    this.deleteCartGoods()
  };
  /**
   *  delete box service item
   */
  deleteBoxHandler = () => {
    let schema = this.getUpdateSchema(this.groupId, {
      $splice: [[this.itemId, 1]]
    })

    let nextState = update(this.state, schema)
    nextState.itemType = -1
    this.setState(nextState)
  };
  /**
   * cancel deleting item that is product item or box service item
   */
  deleteCancelHandler = () => {
    //let nextState = update(this.state, {itemType: {$set: -1}})
    this.setState({isHiddenConfirm: true})
  };
  // backHandler = () => {
  //
  // }
  menuHanler = () => {
    switch (this.props.params.actionModel) {

      case SCAN:
        this.props.history.push()
        break;
      case EDIT:
      //  this.props.history.push(`${BASE_PAGE_DIR}/carts/${SCAN}`)
      this.props.history.goBack()
        break;
    }
    this.props.history.goForward()
  };
  switchHeader = (state = this.state) => {

    switch (state.actionModel) {
      case EDIT:
        state.headerName = '编辑购物车'
        state.menu = <div className="btn-scan-carts">完成</div>
        break;
      default:
        state.headerName = '购物车'
        state.menu = <div className="btn-edit-carts">编辑</div>
    }


  };
  componentWillMount = () => {
    this.switchHeader()

  };
  componentWillUnmount = () => {

    document.removeEventListener('scroll', this.handleScroll);
  };
  componentDidMount = () => {


    this.fetchCartData()
    document.addEventListener('scroll', this.handleScroll);

    recievePageToPageSignal((data) => {
      if (data.signal == PAGE_TO_PAGE_SIGNAL.UPDATE_CART) {
        this.initState({actionModel: SCAN})
        this.fetchCartData()
      }
    })
    /*
    3: '购物车编辑'
    4: '删除订单'
    5：'购物车浏览'
    6：'刷新购物车'
    */
    receiveNotificationsFromApp((data, callback) => {
      if (data.type == '3') {
        this.initState({actionModel: EDIT})
      } else if (data.type == '5') {
        this.initState({actionModel: SCAN})
      }  else if (data.type == '6') {
        this.initState({actionModel: SCAN})
      }
      this.fetchCartData()
    })
  };
  // componentWillReceiveProps = (nextProps) => {
  //   this.switchHeader(nextProps)
  // };
  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.actionModel != nextState.actionModel) {
      //this.initState()
      //this.switchHeader(nextState)

    } else {
      let ids = []
      nextState.goodList.forEach( (item, index) => {
        if (item.goods[0].isSelected) ids.push(item.id)
      })
      nextState.selectedIds = ids
      let calResult = this.calculateTotalPrice(nextState.goodList, nextState.isSelectedAll)
      nextState.totalPrice = calResult.price
      nextState.isDiscountFive = calResult.isDiscountFive
    }

    // try { // in case no result
    //   let checkout = document.querySelector('.check-out-justify-wrap')
    //   checkout.parentNode.style.height = checkout.offsetHeight + 'px'
    // } catch (e) {
    //
    // }


  };
  backHandler = () => {
    if (uaParser.isApp()) {
      backToNativePage()
        .then((data)=>{
          if (data.result == '1') {
            this.props.history.goBack()
          }
        })
    } else {
        this.props.history.goBack()
    }

  };
  render() {
    let url = this.state.selectedIds.length > 0?
                (`${BASE_PAGE_DIR}/order-created/` + this.state.selectedIds.join()):
                "javascript:void(0);"
    return (
      <div className="shopping-cart-container" onClick={this.thisHandler}>
        <div className="scroll-container">
          <div className="scroll-wrapper">
            <div >
              {
                uaParser.isApp()?
                '':
                (
                  <PageHeader
                    headerName={this.state.headerName}
                  >
                    <div className="iconfont icon-arrow-left" onClick={this.backHandler}></div>
                    {this.state.menu}
                  </PageHeader>
                )
              }
              {
                this.state.isNull?
                (<ShoppingCartNoResult />):
                (
                  <div>
                    {
                      this.state.actionModel == SCAN ?
                      (
                        <MatchDiscount />
                      ) :
                      ""
                    }
                    {
                      this.state.actionModel == SCAN ?
                      (
                        <UnderpantsRecommendation ref='recommend'/>
                      ) :
                      ''
                    }

                      {
                        this.state.goodList.map((item, index) => {
                          return (<ShoppingCartGroup
                                    groupId={index}
                                    key={index}
                                    source={item.goods}
                                    cid={item.id}
                                    actionModel={this.state.actionModel}
                                    isSelectedAll={this.state.isSelectedAll}
                                   />
                                  )
                        })
                      }
                      <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>

                  </div>
                )
              }
            </div>
          </div>
          <div className="check-out-wrap">
            <div className="check-out-justify-wrap">
              <div className="select-all">
                {
                  this.state.isSelectedAll?
                   (<i className="iconfont icon-radio-on"></i>):
                   (<i className="iconfont icon-radio"></i>)
                }
                <span>全选</span>
              </div>
              <div className="total-price">
                <div className="price-wrapper">
                  <i>合计：</i><span>&yen;{this.state.totalPrice}</span>
                </div>
                {
                  this.state.isDiscountFive?
                  (<p>已减5元</p>) : ''
                }

              </div>
              <a href={url} className="btn-check-out">结算</a>
            </div>
          </div>
          {
            uaParser.isApp() ? '' : <Nav />
          }
        </div>
        {
          this.state.actionModel == SCAN?
          (
            <UnderwearSelectPanel
              isHidden={this.state.isHiddenSelectPanel}
              category={this.state.category}
              allSize={this.state.allSize}
              size={this.state.size}
              count={this.state.count}
              selectHandler={this.selectHandler.bind(this)}
              source={this.state.goods}
            />
        ) : ''
        }

        <Confirm
          confirmHandler={this.deleteProductHandler}
          isHidden={this.state.isHiddenConfirm}
          msg={this.state.confirmMsg}
          cancelHandler={this.deleteCancelHandler}
        />
        <Prompt msg={this.state.promptMsg} ref="prompt"/>
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>

      </div>
    )
  }
}
reactMixin(ShoppingCart.prototype, detailMixins)
module.exports = ShoppingCart
