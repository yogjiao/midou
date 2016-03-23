import React from 'react'
import ReactDOM from 'react-dom'

import 'CartEntry.less'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_CARTS_STATE
} from 'macros.js'
import {fetchAuth} from 'fetch.js'
import {getUserInfoFromAppWithTimeout} from 'webviewInterface.js'
import {getMiDouToken} from 'commonApp.js'
import {FETCH_SUCCESS} from 'macros.js'
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
      window.location.href = `${BASE_PAGE_DIR}/carts/scan`
    } else {
      getUserInfoFromAppWithTimeout()
        .then(() => {
          window.location.href = `${BASE_PAGE_DIR}/carts/scan`
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
    return (
      <div className="cart-entry-container" onClick={this.thisHandler}>
        <i className="iconfont icon-cart">
        {
          this.state.isEmpty == '0'? (<span></span>) : ''
        }
        </i>
      </div>
    )
  }
}

export default CartEntry
