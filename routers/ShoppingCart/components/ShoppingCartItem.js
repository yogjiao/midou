import React from 'react'
import ReactDOM from 'react-dom'

import {ROUTER_SHOPPING_CART_SCAN, ROUTER_SHOPPING_CART_EDIT} from 'macros.js'

class ShoppingCartItem extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //
    // };
  }
  componentWillMount = () => {
    //this.setState({boxes: countBoxes(this.props.source.cup, this.props.source.bottom_bust)})
  };
  isSameWithBox = (box) => {
    return  box.baseSize == this.props.source.bottom_bust &&
            box.braSize == this.props.source.cup
  };
  render = () => {
    let lastColumn;
    switch (this.props.actionModel) {
      case ROUTER_SHOPPING_CART_SCAN:
        lastColumn = (
          <div className="column">
            <div className="row-wrap">
              <div className="info-col">雪国精灵</div>
              {
                this.props.itemType == '0'?
                '' :
                (
                  <div className="extra-col">
                    <div className="prepay">押</div>
                  </div>
                )}

            </div>
            <div className="row-wrap">
              <div className="info-col">
                <i>尺码:</i>
                <span className="arial pl5">75C</span>
              </div>
            </div>
            <div className="row-wrap">
              <div className="info-col price">&yen; 60</div>
              <div className="extra-col num-mult">
                <i className="iconfont">&#xe601;</i>
                <span>1</span>
              </div>
            </div>
          </div>
        )
        break;
      case ROUTER_SHOPPING_CART_EDIT:
        let boxes,
            numOperate;

        if (this.props.itemType == '1') {
          boxes = this.props.boxes.map((item, index, boxes) => {
            return (<div
                      className={this.isSameWithBox(item)?
                      "box-service-item on" :
                      "box-service-item"}
                      key={index}
                      data-group-id={this.props.groupId}
                      data-item-id={this.props.itemId}
                      data-bra-size={item.braSize}
                      data-base-size={item.baseSize}
                    >
                        {item.baseSize}{item.braSize}
                    </div>)
          })
        }
        if (this.props.itemType == '0') {
          numOperate = (
            <div className="num-wrap info-col">
              <div
                className="iconfont btn-minus"
                data-group-id={this.props.groupId}
                data-item-id={this.props.itemId}>
                  &#xe601;
              </div>
              <div className="num">{this.props.source.count}</div>
              <div
                className="iconfont btn-add"
                data-group-id={this.props.groupId}
                data-item-id={this.props.itemId}>
                  &#xe601;
              </div>
            </div>)
        }

        lastColumn = (
          <div className="column">
            <div className="row-wrap">
              <div className="info-col">
                { this.props.itemType == '0'? numOperate: null}
                { this.props.itemType == '1'? boxes: null}
              </div>
              <div className="extra-col">
                <i className="iconfont btn-delete">&#xe601;</i>
              </div>
            </div>
            <div className="row-wrap">
              {
                this.props.itemType == '0'?
                (<div className="btn-box info-col">添加盒子服务</div>) :
                null
              }
            </div>
          </div>
        )
        break;
    }
    return (
      <div className="item-wrap">
        <div className="column">
          <div>
            <i
              className={this.props.source.isSelected?
                "radio-select iconfont on" :
                "radio-select iconfont"}
              data-group-id={this.props.groupId}
              data-item-id={this.props.itemId}
            >
              &#xe601;
            </i>
          </div>
        </div>
        <div className="column">
          <div className="img-wrap">
            <img src="/media/test.png" />
          </div>
        </div>
        {lastColumn}
      </div>
    )
  };
}

export default ShoppingCartItem
