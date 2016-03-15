import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT, BASE_PAGE_DIR} from 'macros.js'

import 'ShoppingCartItemScan.less'
class ShoppingCartItemScan extends React.Component {
  render = () => {
    let to = `${BASE_PAGE_DIR}/underwear/${this.props.source.gid}` //`${BASE_PAGE_DIR/underwear/${this.props.id}}`
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
                  (<div className="raido select-radio iconfont icon-radio-on" {...ids}></div>) :
                  (<div className="raido select-radio iconfont icon-radio" {...ids}></div>):
                ''
              }
           </li>
           <li className="column">
              <a href={to} className="img-wrap"><img src={this.props.source.main_img} /></a>
           </li>
           <li className="column">
             <div className="name-wrap single-ellipsis">{this.props.source.name}</div>
             <div className="size-wrap">尺码：<span className="arial">{this.props.source.size}</span></div>
             <div className="price-wrap arial">&yen;{this.props.itemType == '0'? this.props.source.price : this.props.source.deposit}</div>
           </li>
           <li className="column">
             <div className="ajust-wrap">
               {holder}
             </div>
             <div className="ajust-wrap">
                {this.props.itemType == '1'? (<div className="prepay-icon">试</div>) : holder}
             </div>
             <div className="ajust-wrap">
                <div className="num-wrap">
                    <span className="iconfont">&#xe602;</span>
                    <span className="arial">{this.props.source.count}</span>
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
