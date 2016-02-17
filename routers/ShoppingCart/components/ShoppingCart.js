import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import * as util from 'util.js'
import PageHeader from 'PageHeader/PageHeader.js'
import ShoppingCartItem from 'ShoppingCartItem.js'

import './ShoppingCart.less'

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="shopping-cart-container">

        <PageHeader headerName="购物车">
          <div className="menu-search" onClick={this.shareHanler}>完成</div>
        </PageHeader>

        <ShoppingCartItem>
          
        </ShoppingCartItem>

      </div>
    )
  }
}

module.exports = ShoppingCart
