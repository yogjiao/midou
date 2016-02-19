import React from 'react'
import ReactDOM from 'react-dom'

import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'
import ShoppingCartItem from 'ShoppingCartItem.js'
class ShoppingCartBoxServiceItem extends React.Component {
  constructor(props) {
    super(props);

  }
  render = () => {
    return (
      <div className="shopping-cart-item">
        <ShoppingCartItem {...this.props} itemType="1"  />
      </div>
      )
  };

}

export default ShoppingCartBoxServiceItem
