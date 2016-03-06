import React from 'react'
import {BASE_STATIC_DIR} from 'macros.js'
import {backToUserCenterNativePage} from 'webviewInterface.js'

import './BoxService.less'
class BoxService extends React.Component {
  backHandler = () => {
    //this.props.history.goBack();
    backToUserCenterNativePage()
      .then((data) => {
      })
  };
  render = () => {
    return (
      <div className="box-servie-container">
        <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
        <div className="img-wrap">
          <img src={`${BASE_STATIC_DIR}/img/box-describe-1.png`} />
        </div>
        <div className="box-item-wrap">
           <h5>购买1件送达2件</h5>
           <div className="img-wrap">
             <img src={`${BASE_STATIC_DIR}/img/box-describe-2.png`} />
           </div>
           <p>每购买一件内衣，您可以选择一次试穿盒子
服务，多试穿一件推荐的相邻码数内衣。试
穿后您可以留下两件中最合身的一件，并进
行“返还内衣”完成交易。</p>
        </div>
        <div className="box-item-wrap">
           <h5>押六十返七十</h5>
           <div className="img-wrap">
             <img src={`${BASE_STATIC_DIR}/img/box-describe-3.png`} />
           </div>
           <p>内新提供您试衣所需的往返邮费，交易完成
后，您购买时抵押的60元试穿诚信金，将增
加至70元原路返回到支付账户。</p>
        </div>
        <div className="box-item-wrap">
           <h5>及时返还内衣得诚信好礼</h5>
           <div className="img-wrap">
             <img src={`${BASE_STATIC_DIR}/img/box-describe-4.png`} />
           </div>
           <p>您使用的盒子服务记录，将被内新认真保存
下来，信用记录良好的姑娘，将能解锁更高
级别的试穿盒子。</p>
        </div>
        <div className="img-wrap logo-wrap"><img src={`${BASE_STATIC_DIR}/img/neixin.png`} /></div>
      </div>
    )
  };
}

module.exports = BoxService
