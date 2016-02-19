import React from 'react'
import ReactDOM from 'react-dom'

import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'
import ShoppingCartItem from 'ShoppingCartItem.js'

class ShoppingCartProductItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

  }
  render = () => {
    let proItem, lineItem

    if (this.props.isAddLine) {
      lineItem = (<div className="sep-line"></div>)
    }

    return (
      <div className="shopping-cart-item clearfix">
        <ShoppingCartItem {...this.props} itemType="0"  />
        {lineItem}
      </div>
      );
  };
}

export default ShoppingCartProductItem
