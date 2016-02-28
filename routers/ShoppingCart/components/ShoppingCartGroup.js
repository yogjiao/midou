import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'


import ShoppingCartItemScan from './ShoppingCartItemScan.js'
import ShoppingCartItemEdit from './ShoppingCartItemEdit.js'

let update = require('react-addons-update');
import {countBoxes} from 'commonApp.js'

import './ShoppingCartGroup.less'
class ShoppingCartGroup extends React.Component {
  render() {
    let elements = []
    switch (this.props.actionModel) {
      case ROUTER_SHOPPING_CART_SCAN:
        let isHaveLine = this.props.source.length > 1? true : false
        elements = this.props.source.map( (item, index) => {
         let params = {
           key: index,
           source: item,
           actionModel: this.props.actionModel,
         }
         if (index == 0) {
           params.itemType = '0'
           params.isHaveLine = isHaveLine
         } else {
           params.itemType = '1'
         }
         return ( <ShoppingCartItemScan {...params} />)
        })

        break;
      case ROUTER_SHOPPING_CART_EDIT:
        let category = this.props.source[0].category
        let params = {
          key: 0,
          source: this.props.source[0],
          actionModel: this.props.actionModel,
          groupId: this.props.groupId,
          itemId: 0,
          itemType: '0',
          isHaveLine: category == 1? true : false
        }
        elements.push(
          (<ShoppingCartItemEdit {...params} />)
        )

        if (category == '1') {
          let params = {
            key: 1,
            source: this.props.source.slice(1),
            actionModel: this.props.actionModel,
            groupId: this.props.groupId,
            itemType: '1',
            isHaveLine: false,
            boxes: countBoxes.apply(null, this.props.source[0].size.split('-').reverse())
          }
          elements.push(
            (<ShoppingCartItemEdit {...params} />)
          )
        }
        break;

    }


    return (
      <div className={`group-wrap  cart-${this.props.actionModel}-model`}>
        {elements}
      </div>
    )
  }
}

export default ShoppingCartGroup
