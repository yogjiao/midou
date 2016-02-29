import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {
  BASE_PAGE_DIR
} from 'macros.js'
import './UserOrderItem.less'
class UserOrderItem extends React.Component {
  /**
   * itemType 1 product item; 2 box service item;
   * pageType 1 create order; 2 order detail; 3 order list
   */
  componentWillMount = () => {
    //this.setState({boxes: countBoxes(this.props.source.cup, this.props.source.bottom_bust)})
  };
  render = () => {
    let row_1, row_2, row_3,
        pageType = this.props.pageType,
        itemType = this.props.itemType;
    switch (pageType) {
      case '1':
        if (itemType == 1) {
          row_3 = (<div className="arial"><i className="iconfont">&#xe602;</i>{this.props.source.count}</div>)
        } else if (itemType == 2) {
          row_1 = (<div className="prepay-icon">押</div>)
          row_3 = (<div className="arial"><i className="iconfont">&#xe602;</i>{this.props.source.count}</div>)
        }
        break;
      case '2':
        if (itemType == 1) {
          row_1 = (<Link className="btn-draw-back" to={`${BASE_PAGE_DIR}/express/${this.props.source.id}/0`}>退款</Link>)
        } else if (itemType == 2) {
          row_1 = (<div className="prepay-icon">押</div>)
          row_2 = (<div className="btn-box-operate btn-pay-lack" data-source={JSON.stringify(this.props.source)}>补差价</div>)
          row_3 = (<Link className="btn-box-operate return-uw" to={`${BASE_PAGE_DIR}/express/${this.props.source.id}/1`}>返回内衣</Link>)

        }
        break;
      case '3':
        if (itemType == 1) {
          row_1 = (<i className="iconfont">&#xe601;</i>)
          row_3 = (<div className="create-time">2014-05-06 25:19:20</div>)
        } else if (itemType == 2) {
          row_1 = (<div className="prepay-icon">押</div>)
          row_2 = (<i className="iconfont">&#xe601;</i>)
          row_3 = (<div className="create-time">2014-05-06 25:19:20</div>)
        }
        break;


    }
    return (
      <div className="order-item-container">
        <div className="column">
          <div className="img-wrap"><img src="/media/test.png" /></div>
        </div>
        <div className="column">
          <div className="row-wrap">
            <div className="pro-name">{this.props.source.name}</div>
            <div className="order-justify-wrap">
            {row_1}
            </div>
          </div>
          <div className="row-wrap">
            <div className="size-wrap">
              尺码：<span className="arial pl5">75C</span>
            </div>
            <div className="order-justify-wrap">
              {row_2}
            </div>
          </div>
          <div className="row-wrap">
            <div className="price arial">&yen; 99</div>
            <div className="order-justify-wrap">
              {row_3}
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default UserOrderItem
