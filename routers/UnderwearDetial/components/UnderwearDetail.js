import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import './Underweardetail.less'

import PageHeader from 'PageHeader/PageHeader.js'
import UnderweardetailBanner from 'UnderweardetailBanner.js'
import UnderweardetailInfo from 'UnderweardetailInfo.js'
import UnderweardetailFooter from 'UnderweardetailFooter.js'
import UnderwearDetailSelectModel from 'UnderwearDetailSelectModel.js'


import {registerHandler, callHandler} from 'webviewInterface.js'
import * as macros from 'macros.js'

class Underweardetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyModel: 0, //[加入购物车，立即购买]
      pageInfo: {
        pageIndex: 0,
        pageSize: 10,
      },
      prolist: [
          {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    };

  }

  /**
   * arrow function must end with semicolon, if not the wepback compile will error
   * add product to shopping car handler
   */
  addShoppingCartHandler = () => {
    this.refs['select-model'].show();
  };
  /**
   * buy immediately handler
   */
  buyNowHandler = () => {
    this.refs['select-model'].show();
  };
  /**
   * share with social circle
   */
  shareHanler = () => {
    callHandler(macros.SHARE_HANLER, {}, function(data){
      alert('分享成功了' + JSON.stringify(data))
    })
  };
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="uw-detail-container">
        <PageHeader headerName="产品详情">
          <div className="menu-search" onClick={this.shareHanler}>分享</div>
        </PageHeader>
        <UnderweardetailBanner img="/media/test.png"/>
        <UnderweardetailInfo />
        <UnderweardetailFooter
          buyModel={this.state.buyModel}
          addShoppingCartHandler={this.addShoppingCartHandler}
          buyNowHandler={this.buyNowHandler}
        />
        <UnderwearDetailSelectModel
          ref="select-model"
        />
      </div>
    )
  }
}

module.exports = Underweardetail
