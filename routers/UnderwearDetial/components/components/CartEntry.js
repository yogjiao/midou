import React from 'react'
import ReactDOM from 'react-dom'

import 'CartEntry.less'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_CARTS_STATE
} from 'macros.js'
import {fetchAuth} from 'fetch.js'
import {getUserInfoFromApp} from 'webviewInterface.js'
import {getMiDouToken} from 'commonApp.js'
import {FETCH_SUCCESS} from 'macros.js'
import ua from 'uaParser.js'
class CartEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: '1'
    }
  }
  fetchDate = () => {
    fetchAuth(FETCH_CARTS_STATE)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          if (data.is_empty == '0') {
            this.setState({isEmpty: '0'})
          }
        }
      })
  };
  thisHandler = () => {
    let token = getMiDouToken()

    if (token) {
      return
    } else {
      getUserInfoFromApp()
        .then(() => {
          window.location.reload()
        })
    }
  };
  componentDidMount = () => {
    let token = getMiDouToken()
    if (token) {
      this.fetchDate()
    }
  };
  render() {
    let href, style = {}
    if (getMiDouToken()) {
      href = `${BASE_PAGE_DIR}/carts`
    } else {
      href = 'javascript:void(0)'
    }
    return (
      <a className="cart-entry-container" href={href} onClick={this.thisHandler}>
        <i className="iconfont icon-cart">
        {
          this.state.isEmpty == '0'? (<span></span>) : ''
        }
        </i>
      </a>
    )
  }
}

export default CartEntry
