import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import ShoppingCartGroup from 'ShoppingCartGroup.js'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'
import {getParentByClass} from 'util.js'


let update = require('react-addons-update');


import './ShoppingCart.less'
class ShoppingCart extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      goodList: [],
      totalPrice: 0,
    }

  }
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
    let schema = {};
    let temp = schema;
    
    ['goodList', groupId, 'goods', itemId].forEach((item, index) => {
       let holder = index == 3? operateSchema :　{};
       temp = temp[item] = holder
    });
    return schema
  };
  getTargetIds = (target) => {
    return {
      groupId: target.getAttribute('data-group-id'),
      itemId: target.getAttribute('data-item-id'),
    }
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
      let {groupId, itemId} = this.getTargetIds(target);
      let schema = this.getUpdateSchema(groupId, itemId, {count: {$apply: (val) => {return ++val} }})
      nextState = update(this.state, schema)
    }
    nextState && this.setState(nextState)
  };
  componentWillReceiveProps = (props) => {
  };
  componentDidMount = () => {
    this.props.getPageSpin() && this.props.getPageSpin().show()

    fetch('/app/get_cart')
      .then(data => {
        data = {
          cart: [
                  {
                      "id": "10",
                      "ts": "2016-02-04 10:18:32",
                      "goods":
                          [
                              {
                                  "cgid": "1",
                                  "gid": "1",
                                  "name": "商品名",
                                  "main_img": "http://mielseno.com/view/photo/goods/10eb121750562bc8b3e966eb9158361b42697.jpeg",
                                  "count": "2",
                                  "color": "0",
                                  "bottom_bust": "70",
                                  "cup": "A",
                                  "price": "99.00",
                                  "deposit": "0.00",
                                  "total_price": "198.00",
                                  "try": "0"
                              },
                              {
                                  "cgid": "2",
                                  "gid": "1",
                                  "name": "商品名",
                                  "main_img": "http://mielseno.com/view/photo/goods/10eb121750562bc8b3e966eb9158361b42697.jpeg",
                                  "count": "2",
                                  "color": "0",
                                  "bottom_bust": "75",
                                  "cup": "A",
                                  "price": "99.00",
                                  "deposit": "0.00",
                                  "total_price": "99.00",
                                  "try": "1"
                              },
                              {
                                  "cgid": "3",
                                  "gid": "1",
                                  "name": "商品名",
                                  "main_img": "http://mielseno.com/view/photo/goods/10eb121750562bc8b3e966eb9158361b42697.jpeg",
                                  "count": "1",
                                  "color": "0",
                                  "bottom_bust": "70",
                                  "cup": "B",
                                  "price": "99.00",
                                  "deposit": "0.00",
                                  "total_price": "99.00",
                                  "try": "1"
                              }
                          ]
                  }
              ]
        }
        if (this.props.params.actionModel == ROUTER_SHOPPING_CART_EDIT) {
          data.cart = this.flatBoxServiceData(data.cart);
        }
        this.setState({goodList: data.cart})
        this.props.getPageSpin().hide();

      })
      .catch(error => this.props.getPageSpin().hide())
  };

  render() {
    return (
      <div className="shopping-cart-container" onClick={this.editHandler}>

        <PageHeader headerName="购物车编辑">
          <div className="menu-search" onClick={this.shareHanler}>完成</div>
        </PageHeader>
        {
          this.state.goodList.map((item, index) => {
            return (<ShoppingCartGroup
                      groupId={index}
                      key={index}
                      groupSouce={item.goods}
                      cid={item.id}
                      actionModel={this.props.params.actionModel}
                     />
                    )
          })
        }

        <div className="check-out-wrap">
          <div className="justify-wrap">
            <div className="select-all">
              <i className="iconfont">&#xe601;</i><span>全选</span>
            </div>
            <div className="total-price">
              <i>合计：</i><span>&yen;{this.state.totalPrice}</span>
            </div>
            <div className="btn-check-out">结算</div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ShoppingCart
