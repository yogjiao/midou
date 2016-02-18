import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import * as util from 'util.js'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'
import './ShoppingCartGroup.less'

import ShoppingCarProductItem from 'ShoppingCarProductItem.js'
import ShoppingCartBoxServiceItem from 'ShoppingCartBoxServiceItem.js'
let update = require('react-addons-update');

class ShoppingCartGroup extends React.Component {
  constructor(props) {
    super(props);// groupSouce actionModel

  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    let boxes = []
    for (let i = 1; i < this.props.groupSouce.length; i++ ) {
      let itemSource = this.props.groupSouce[i],
          count;
      // scan model
      if (this.props.actionModel == ROUTER_SHOPPING_CART_SCAN) {
        boxes.push(<ShoppingCartBoxServiceItem key={i} source={itemSource} actionModel={this.props.actionModel}/>)
      }
      // edit model
      else if (this.props.actionModel == ROUTER_SHOPPING_CART_EDIT) {
        try{
          count = parseInt(itemSource.count)
        }catch(e){
          count = 0;
        }
        for (; count > 0; count--) {
          boxes.push(<ShoppingCartBoxServiceItem key={`${i}=${count}`} source={update(itemSource, {count: {$set: 1}})} actionModel={this.props.actionModel}/>)
        }
      }

    }
    return (
      <div>
        <ShoppingCarProductItem key={0} source={this.props.groupSouce[0]}  actionModel={this.props.actionModel}/>
        {boxes}
      </div>
    )
  }
}

export default ShoppingCartGroup
