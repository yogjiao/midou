import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT, BASE_PAGE_DIR} from 'macros.js'
import {pick} from 'util.js'
import 'ShoppingCartItemEdit.less'
class ShoppingCartItemEdit extends React.Component {
  findBoxAndIndex = (size, boxSource) => {
    let cursor = -1
    let box = boxSource.find((item, index) => {
      if (item.size == size) {
        cursor = index;
        return true
      }
    })
    return {box: box || {}, cursor: cursor}
  };
  render = () => {
    let to = `${BASE_PAGE_DIR}/underwear/${this.props.id}` //
    let lastColumn
    let ids = {}
    switch (this.props.itemType) {
      case '0':
        //ids = {}//pick(this.props, 'groupId', 'itemId', 'itemType')
        ids['data-group-id'] = this.props.groupId;
        ids['data-item-id'] = this.props.itemId;
        ids['data-item-type'] = this.props.itemType;
        lastColumn = (
          <li className="column">
            <div className="ajust-wrap">
               <div className="select-num">
                 <div className="btn-minus" {...ids}>
                   <i className="iconfont icon-minus" />
                 </div>
                 <div className="nums">{this.props.source.count}</div>
                 <div className="btn-add" {...ids}>
                   <i className="iconfont icon-add" />
                 </div>
               </div>
             </div>
             <div className="ajust-wrap">
               <div className="iconfont btn-delete" {...ids}>&#xe608;</div>
             </div>
          </li>
        )
        break;
      case '1':
        lastColumn = this.props.boxes.map( (item, index) => {
          let boxData = this.findBoxAndIndex(`${item.baseSize}-${item.braSize}`, this.props.source) || {}
          //let ids = {}
          ids['data-group-id'] = this.props.groupId
          ids['data-item-id'] = boxData.cursor > -1? boxData.cursor + 1 : -1
          ids['data-item-type'] = this.props.itemType
          ids['data-base-size'] = item.baseSize
          ids['data-bra-size'] = item.braSize
          ids['data-cgid'] = boxData.box.cgid
          return (
            <div className="ajust-wrap" key={index}>
               <div className="box-service-item">{`${item.baseSize}${item.braSize}`}</div>
               <div className="select-num">
                 <div className="btn-minus" {...ids}>
                   <i className="iconfont icon-minus" />
                 </div>
                 <div className="nums">{boxData.box.count || 0}</div>
                 <div className="btn-add" {...ids}>
                   <i className="iconfont icon-add" />
                 </div>
               </div>

            </div>
          )
        })
        lastColumn = (<li className="column">{lastColumn}</li>)
        break;

    }

    let holder = (<span>&nbsp;</span>)
    let line = this.props.isHaveLine? (<div className="line"></div>) : ''
    let img = this.props.source.main_img || this.props.img

    return (
      <div className="item-wrap clearfix">
        <ul>
           <li className="column">
           {
             this.props.itemType == '0'?
               this.props.source.isSelected?
               (<div className="raido select-radio" {...ids}><i className="iconfont icon-radio-on"/></div>) :
               (<div className="raido select-radio" {...ids}><i className="iconfont icon-radio"/></div>):
             ''
           }
           </li>
           <li className="column">
             <div className="img-wrap">
               <a href={to}  style={{backgroundImage: `url(${img})`}}></a>
             </div>
           </li>
           {lastColumn}
        </ul>
        {line}
      </div>
    )
  };
}

export default ShoppingCartItemEdit
