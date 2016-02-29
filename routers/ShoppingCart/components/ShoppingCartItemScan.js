import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT, BASE_PAGE_DIR} from 'macros.js'

import 'ShoppingCartItemScan.less'
class ShoppingCartItemScan extends React.Component {
  render = () => {
    let to = 'http://baidu.com' //`${BASE_PAGE_DIR/underwear/${this.props.id}}`
    let holder = (<span>&nbsp;</span>)
    let line = this.props.isHaveLine? (<div className="line"></div>) : ''
    let ids = {};
    ids['data-group-id'] = this.props.groupId;
    ids['data-item-id'] = this.props.itemId;
    ids['data-item-type'] = this.props.itemType;
    return (
      <div className="item-wrap clearfix">
        <ul className="columns">
           <li className="column">
              {
                this.props.itemType == '0'?
                  this.props.source.isSelected?
                  (<div className="raido select-radio iconfont on" {...ids}>&#xe602;</div>) :
                  (<div className="raido select-radio iconfont" {...ids}>&#xe601;</div>):
                ''
              }
           </li>
           <li className="column">
              <Link to={to} className="img-wrap"><img src="/media/test.png" /></Link>
           </li>
           <li className="column">
             <div className="name-wrap single-ellipsis">{this.props.source.name}</div>
             <div className="size-wrap">尺码：<span className="arial">{this.props.source.size}</span></div>
             <div className="price-wrap arial">&yen;{this.props.source.price}</div>
           </li>
           <li className="column">
             <div className="ajust-wrap">
               {holder}
             </div>
             <div className="ajust-wrap">
                {this.props.itemType == '1'? (<div className="prepay-icon">押</div>) : holder}
             </div>
             <div className="ajust-wrap">
                <div className="num-wrap">
                    <span className="iconfont">&#xe602;</span>
                    <span className="arial">2</span>
                </div>
             </div>

           </li>
        </ul>
        {line}
      </div>
    )
  };
}

export default ShoppingCartItemScan