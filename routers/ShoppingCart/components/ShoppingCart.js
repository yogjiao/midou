import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import ShoppingCartGroup from 'ShoppingCartGroup.js'
import {
    ROUTER_SHOPPING_CART_SCAN,
    ROUTER_SHOPPING_CART_EDIT,
    FETCH_CARTS,
    FETCH_STATUS_NO_MORE_PRODUCT,
    PUT_BOX_SERVICE,
    POST_EDIT_CART
  } from 'macros.js'
import {fetchable, fetchAuth, fetchMock} from 'fetch.js'
import {getParentByClass} from 'util.js'
import {countBoxes} from 'commonApp.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
let update = require('react-addons-update');


import './ShoppingCart.less'
class ShoppingCart extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      goodList: [],
      totalPrice: 0,
      isSelectedAll: false,
      itemType: -1, // 0: deleteProduct 1: deleteBox
      promptMsg: '',

      pageIndex: 0,
      pageSize: 2,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveGoods: true,
    }

  }
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
   * calculate all product price
   * @param nextState [Object] optianal
   */
  calculateTotalPrice = (goodList) => {
    let price = 0;
    goodList = goodList || this.state.goodList
    goodList.forEach((item, index) => {
      if (item.goods[0].isSelected) {
        item.goods.forEach((item, index) => {
            price += item.price * item.count
        })
      }
    })
    //nextState = update(this.state, {totalPrice: {$set: price}})
    //this.setState(nextState)
    return price;
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
      groupId: target.getAttribute('data-group-id'),
      itemId: target.getAttribute('data-item-id'),
      itemType: target.getAttribute('data-item-type')
    }
  };
  putBoxService = () => {
    let url = `${PUT_BOX_SERVICE}`
    let nextState = {isFetching: true}
    this.setState(nextState)

    fetchMock(url, {method: 'post'})
      .then((data) => {
        let splice = [this.state.goodList.length, 0].concat(data.cart)
        let nextState = update(this.state, {
          goodList: {$splice: [splice]},
          isFetching:{$set: false},
          isHiddenPageSpin: {$set: true}
        })
        this.setState(nextState)
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
        })
      })

  };
  fetchCartData = (isScrollingFetch = false) => {
     let url = `${FETCH_CARTS}/${this.state.pageIndex}/${this.state.pageSize}`
     let nextState = {
       isFetching: true,
       isHiddenScrollingSpin: isScrollingFetch? false : true,
       isHiddenPageSpin: isScrollingFetch? true : false
     }

     this.setState(nextState)

     fetchMock(url)
       .then((data) => {
         if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
           this.state.isHaveGoods = false
         }
         let splice = [this.state.goodList.length, 0].concat(data.cart)
         let nextState = update(this.state, {
           goodList: {$splice: [splice]},
           isFetching:{$set: false},
           isHiddenPageSpin: {$set: true},
           isHiddenScrollingSpin: {$set: true}
         })
         this.setState(nextState)
       })
       .catch((error) => {
         this.setState({
           isFetching: false,
           isHiddenPageSpin: true,
           isHiddenScrollingSpin: true
         })
       })

  };
  editHandler = (e) => {
    let target,
        nextState;

    if (target = getParentByClass(e.target, 'btn-post')) {
      if (this.buyActionModel == 0) {// add product to shopping cart

      } else {// buy now

      }
      return
    }


    if (target = getParentByClass(e.target, 'btn-add')) {
      let {groupId, itemId} = this.getTargetDataAttres(target)
      let schema = this.getUpdateSchema(groupId, itemId,
          {count: {$apply: (val) => {return ++val} }})
      nextState = update(this.state, schema)

      schema = this.getUpdateSchema(groupId,
          {$push: [{}]})

      nextState = update(nextState, schema)

    } else if (target = getParentByClass(e.target, 'btn-minus')) {

      let count = 0
      let tempNextState
      let {groupId, itemId} = this.getTargetDataAttres(target)
      let schema = this.getUpdateSchema(groupId, itemId,
          {count: {$apply: (val) => { count = --val; return count;} }})
      tempNextState = update(this.state, schema)
      if (count == 0) {
        nextState = update(this.state, {promptMsg: {$set: '如果想删除该产品，请单击删除按钮'}})
        this.refs['prompt'].show();
      } else {

        nextState = tempNextState
        let goods = nextState.goodList[groupId].goods
        if (goods[0].count < (goods.length - 1)) {
          schema = this.getUpdateSchema(groupId,
              {$splice: [[-1, 1]]})
          nextState = update(nextState, schema)
        }
      }

    } else if (target = getParentByClass(e.target, 'radio-select')) {//isSelected
      let {groupId, itemId} = this.getTargetDataAttres(target)
      let schema = this.getUpdateSchema(groupId, itemId,
          {
            isSelected: {$apply: val => !val }
          })

      nextState = update(this.state, schema)
      if (this.state.goodList[groupId].goods[itemId].isSelected &&
          this.state.isSelectedAll) {
        nextState.isSelectedAll = false
      }

    } else if (target = getParentByClass(e.target, 'select-all')) {

      nextState = update(this.state, {isSelectedAll: {$apply: val => !val}})
      this.triggerSelectAll(nextState)

    } else if (target = getParentByClass(e.target, 'btn-delete')) {
      let {groupId, itemId, itemType} = this.getTargetDataAttres(target)
      this.deleteGroupId = groupId
      this.deleteItemId = itemId
      nextState = update(this.state, {itemType: {$set: parseInt(itemType)}})

    } else if (target = getParentByClass(e.target, 'btn-check-out')) {
      if (this.state.totalPrice == 0) {
        nextState = update(this.state, {promptMsg: {$set: '请至少选择一件商品'}})
        this.refs['prompt'].show();
      }
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
        this.fetchCartData()
      }
    }
  };
  /**
   *  delete product item
   */
  deleteProductHandler = () => {
    //this.deleteItemId
    let schema = this.getUpdateSchema({
      $splice: [[this.deleteGroupId, 1]]
    })
    let nextState = update(this.state, schema)
    nextState.itemType = -1
    this.setState(nextState)
  };
  /**
   *  delete box service item
   */
  deleteBoxHandler = () => {
    let schema = this.getUpdateSchema(this.deleteGroupId, {
      $splice: [[this.deleteItemId, 1]]
    })

    let nextState = update(this.state, schema)
    nextState.itemType = -1
    this.setState(nextState)
  };
  /**
   * cancel deleting item that is product item or box service item
   */
  deleteCancelHandler = () => {
    let nextState = update(this.state, {itemType: {$set: -1}})
    this.setState(nextState)
  };

  componentWillMount = () => {
    switch (this.props.params.actionModel) {
      case ROUTER_SHOPPING_CART_SCAN:
        this.state.headerName = '购物车'
        this.state.menuName = '编辑'
        break;
      case ROUTER_SHOPPING_CART_EDIT:
        this.state.headerName = '编辑购物车'
        this.state.menuName = '完成'
        break;
    }
  };
  componentWillUnmount = () => {

    document.removeEventListener('scroll', this.handleScroll.bind(this));
  };
  componentDidMount = () => {
    this.fetchCartData()
    document.addEventListener('scroll', this.handleScroll.bind(this));
  };
  componentWillReceiveProps = (props) => {
  };
  componentWillUpdate = (nextProps, nextState) => {
    nextState.totalPrice = this.calculateTotalPrice(nextState.goodList, nextState.isSelectedAll)
  };
  render() {
    let confirm
    switch (this.state.itemType) {
      case 0:
        confirm = (
          <Confirm
            confirmHandler={this.deleteProductHandler}
            msg='你确定要删除该产品吗？'
            cancelHandler={this.deleteCancelHandler}
          />
        )
        break;
      case 1:
      confirm = (
        <Confirm
          confirmHandler={this.deleteBoxHandler}
          msg='你确定要删除改试穿产品吗？'
          cancelHandler={this.deleteCancelHandler}
        />
      )
        break;

    }
    return (
      <div className="shopping-cart-container" onClick={this.editHandler}>
        <PageHeader
          headerName={this.state.headerName}
        >
          <div></div>
          <div className="menu-search" onClick={this.menuHanler}>{this.state.menuName}</div>
        </PageHeader>
        {
          this.state.goodList.map((item, index) => {
            return (<ShoppingCartGroup
                      groupId={index}
                      key={index}
                      source={item.goods}
                      cid={item.id}
                      actionModel={this.props.params.actionModel}
                      isSelectedAll={this.state.isSelectedAll}
                     />
                    )
          })
        }
        <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
        <div className="check-out-wrap">
          <div className="justify-wrap">
            <div className="select-all">
              <i
                className={this.state.isSelectedAll? 'iconfont on' : 'iconfont'}
              >
                &#xe601;
              </i>
              <span>全选</span>
            </div>
            <div className="total-price">
              <i>合计：</i><span>&yen;{this.state.totalPrice}</span>
            </div>
            <div className="btn-check-out">结算</div>
          </div>
        </div>
        {confirm}
        <Prompt msg={this.state.promptMsg} ref="prompt"/>
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

module.exports = ShoppingCart
