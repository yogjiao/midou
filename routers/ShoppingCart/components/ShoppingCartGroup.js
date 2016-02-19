import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import * as util from 'util.js'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'
import './ShoppingCartGroup.less'

import ShoppingCartProductItem from 'ShoppingCartProductItem.js'
import ShoppingCartBoxServiceItem from 'ShoppingCartBoxServiceItem.js'
let update = require('react-addons-update');
import {countBoxes} from 'commonApp.js'

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
      let itemSource = this.props.groupSouce[i]
      boxes.push(<ShoppingCartBoxServiceItem
                  key={i}
                  groupId={this.props.groupId}
                  itemId={i}
                  boxes={countBoxes(this.props.groupSouce[0].cup, this.props.groupSouce[0].bottom_bust)}
                  source={itemSource}
                  actionModel={this.props.actionModel}
                 />)

    }
    return (
      <div className="group-wrap">
        <ShoppingCartProductItem
          key="0"
          groupId={this.props.groupId}
          itemId="0"
          source={this.props.groupSouce[0]}
          actionModel={this.props.actionModel}
          isAddLine={!!this.props.groupSouce[1]} />

        {boxes}
      </div>
    )
  }
}

export default ShoppingCartGroup
