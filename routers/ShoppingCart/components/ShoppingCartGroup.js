import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import * as util from 'util.js'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'


import ShoppingCartItem from './ShoppingCartItem.js'
let update = require('react-addons-update');
import {countBoxes} from 'commonApp.js'

import './ShoppingCartGroup.less'
class ShoppingCartGroup extends React.Component {
  constructor(props) {
    super(props);// groupSouce actionModel

  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    // let firstItem = this.props.groupSouce[0]
    // let elements
    // if (firstItem.category == '1') {
    //   boxes = countBoxes.apply(null, firstItem.size.split('-').reverse())
    //   boxEls = []
    //   for (let i = 1; i < this.props.groupSouce.length; i++ ) {
    //     let itemSource = this.props.groupSouce[i]
    //     boxEls.push(<ShoppingCartBoxServiceItem
    //                   key={i}
    //                   groupId={this.props.groupId}
    //                   itemId={i}
    //                   boxes={boxes}
    //                   source={itemSource}
    //                   actionModel={this.props.actionModel}
    //                   isSelectedAll={this.props.isSelectedAll}//ShoppingCartItem
    //                />)
    //   }
    // }

    let elements = this.props.source.map( (item, index) => {
      let el
      if (index == 0) {
        el = (
          <ShoppingCartItem
            source={item}
            itemType='0'
            actionModel={this.props.actionModel}
          />)
      } else {

      }

      return el
    })

    return (
      <div className="group-wrap">
        {elements}
      </div>
    )
  }
}

export default ShoppingCartGroup
