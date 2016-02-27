import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT, BASE_PAGE_DIR} from 'macros.js'

import 'ShoppingCartItem.less'
class ShoppingCartItem extends React.Component {

  componentWillMount = () => {
    //this.setState({boxes: countBoxes(this.props.source.cup, this.props.source.bottom_bust)})
  };
  isSameWithBox = (box) => {
    return  box.baseSize == this.props.source.bottom_bust &&
            box.braSize == this.props.source.cup
  };
  render = () => {
    // let lastColumn;
    // switch (this.props.actionModel) {
    //   case ROUTER_SHOPPING_CART_SCAN:
    //     lastColumn = (
    //       <div className="column">
    //         <div className="row-wrap">
    //           <div className="info-col">{this.props.source.name}</div>
    //           {
    //             this.props.itemType == '0'?
    //             '' :
    //             (
    //               <div className="extra-col">
    //                 <div className="prepay-icon">押</div>
    //               </div>
    //             )}
    //
    //         </div>
    //         <div className="row-wrap">
    //           <div className="info-col">
    //             <i>尺码:</i>
    //             <span className="arial pl5">{this.props.source.size.replace('-', '')}</span>
    //           </div>
    //         </div>
    //         <div className="row-wrap">
    //           <div className="info-col price">&yen; {this.props.source.price}</div>
    //           <div className="extra-col num-mult">
    //             <i className="iconfont">&#xe602;</i>
    //             <span>{this.props.source.count}</span>
    //           </div>
    //         </div>
    //       </div>
    //     )
    //     break;
    //   case ROUTER_SHOPPING_CART_EDIT:
    //     let boxes,
    //         numOperate;
    //
    //     if (this.props.itemType == '1') {
    //       boxes = this.props.boxes.map((item, index, boxes) => {
    //         return (<div
    //                   className={this.isSameWithBox(item)?
    //                   "box-service-item on" :
    //                   "box-service-item"}
    //                   key={index}
    //                   data-group-id={this.props.groupId}
    //                   data-item-id={this.props.itemId}
    //                   data-bra-size={item.braSize}
    //                   data-base-size={item.baseSize}
    //                 >
    //                     {item.baseSize}{item.braSize}
    //                 </div>)
    //       })
    //     }
    //     if (this.props.itemType == '0') {
    //       numOperate = (
    //         <div className="num-wrap info-col">
    //           <div
    //             className="iconfont btn-minus"
    //             data-group-id={this.props.groupId}
    //             data-item-id={this.props.itemId}>
    //               &#xe601;
    //           </div>
    //           <div className="num">{this.props.source.count}</div>
    //           <div
    //             className="iconfont btn-add"
    //             data-group-id={this.props.groupId}
    //             data-item-id={this.props.itemId}>
    //               &#xe601;
    //           </div>
    //         </div>)
    //     }
    //
    //     lastColumn = (
    //       <div className="column">
    //         <div className="row-wrap">
    //           <div className="info-col">
    //             { this.props.itemType == '0'? numOperate: null}
    //             { this.props.itemType == '1'? boxes: null}
    //           </div>
    //           <div className="extra-col">
    //             <i
    //               className="iconfont btn-delete"
    //               data-group-id={this.props.groupId}
    //               data-item-id={this.props.itemId}
    //               data-item-type={this.props.itemType}
    //             >
    //               &#xe601;
    //             </i>
    //           </div>
    //         </div>
    //         <div className="row-wrap">
    //           {
    //             this.props.itemType == '0'?
    //             (<div className="btn-box info-col">添加盒子服务</div>) :
    //             null
    //           }
    //         </div>
    //       </div>
    //     )
    //     break;
    // }
    let to = 'http://baidu.com' //`${BASE_PAGE_DIR/underwear/${this.props.id}}`
    return (
      <div>
      <div className="item-wrap">
        <ul>
           <li className="column">
              <div className="raido iconfont">&#xe601;</div>
           </li>
           <li className="column">
              <Link to={to} className="img-wrap"><img src="/media/test.png" /></Link>
           </li>
           <li className="column">
             <div className="name-wrap">撒发生法萨芬</div>
             <div className="size-wrap">撒发生法萨芬</div>
             <div className="price-wrap">撒发生法萨芬</div>
           </li>
           <li className="column">
             <div className="ajust-wrap">
                <div className="prepay-icon">押</div>
             </div>
             <div className="ajust-wrap">
                <div className="prepay-icon">押</div>
             </div>
             <div className="ajust-wrap">
                <div className="num-wrap">
                    <span className="iconfont">&#xe602;</span>
                    <span className="arial">2</span>
                </div>
             </div>

           </li>
        </ul>
      </div>

      <div className="item-wrap">
        <ul>
           <li className="column">
              <div className="raido iconfont">&#xe601;</div>
           </li>
           <li className="column">
              <Link to={to} className="img-wrap"><img src="/media/test.png" /></Link>
           </li>
           <li className="column">
             <div className="select-num">
               <div className="btn-minus">-</div>
               <div className="nums">0</div>
               <div className="btn-add">+</div>
             </div>
             <div className="select-num">
               <div className="btn-minus">-</div>
               <div className="nums">0</div>
               <div className="btn-add">+</div>
             </div>
           </li>
           <li className="column">
              <div className="ajust-wrap">
                 <div className="box-service-item">75A</div>
              </div>
           </li>
        </ul>
      </div>
      </div>
    )
  };
}

export default ShoppingCartItem
