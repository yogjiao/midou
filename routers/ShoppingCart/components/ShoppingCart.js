import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import * as util from 'util.js'
import PageHeader from 'PageHeader/PageHeader.js'
import ShoppingCartGroup from 'ShoppingCartGroup.js'

import './ShoppingCart.less'

class ShoppingCart extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      prolist: [],
      totalPrice: 0,
    }

  }
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
                                  "count": "1",
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
        this.setState({prolist: data.cart})
        this.props.getPageSpin().hide();
      })
      .catch(error => this.props.getPageSpin().hide())
  };
  render() {
    return (
      <div className="shopping-cart-container">

        <PageHeader headerName="购物车">
          <div className="menu-search" onClick={this.shareHanler}>完成</div>
        </PageHeader>
        {
          this.state.prolist.map((item, index) => {
            return (<ShoppingCartGroup key={index} groupSouce={item.goods} cid={item.id}  actionModel={this.props.params.actionModel}/>)
          })
        }

        <div className="check-out-wrap">
          <div className="select-all">
            <i className="iconfont">&#xe601;</i><span>全选</span>
          </div>
          <div className="total-price">
            <i>合计：</i><span>&yen;{this.state.totalPrice}</span>
          </div>
          <div className="btn-check-out">结算</div>
        </div>
      </div>
    )
  }
}

module.exports = ShoppingCart