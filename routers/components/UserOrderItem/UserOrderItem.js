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
        itemType = this.props.itemType,
        price;
    switch (pageType) {
      case '1':
        if (itemType == 1) {
          row_3 = (<div className="arial"><i className="iconfont">&#xe602;</i>{this.props.source.count}</div>)
          price = <div className="price arial">&yen;{`${this.props.source.price}`}</div>
        } else if (itemType == 2) {
          row_1 = (<div className="prepay-icon">押</div>)
          row_3 = (<div className="arial"><i className="iconfont">&#xe602;</i>{this.props.source.count}</div>)
          price = <div className="price arial">&yen;{`${this.props.source.deposit}`}</div>
        }

        break;
      case '2':
        if (itemType == 1) {

          if (this.props.source.order_state >= 12) {
            row_1 = (<Link className="btn-draw-back" to={`${BASE_PAGE_DIR}/express/${this.props.source.id}/0`}>退款</Link>)
          } else {
            row_1 = (<span></span>)
          }
          price = <div className="price arial">&yen;{`${this.props.source.price}`}<i className="iconfont icon-close"/>{this.props.source.count}</div>
        } else if (itemType == 2) {
          row_1 = (<div className="prepay-icon">押</div>)

          if (this.props.source.order_state >= 12 && this.props.source.order_state < 32){
            if (this.props.source.order_state  == '13') {
              row_2 = (<div className="btn-box-operate">已补差价</div>)
            } else {
              row_2 = (<div className="btn-box-operate btn-pay-lack" data-source={JSON.stringify(this.props.source)}>补差价</div>)
            }
          } else {
            row_2 = (<span></span>)
          }


          if (this.props.source.order_state >= 12 && this.props.source.order_state < 32){
            row_3 = (<Link className="btn-box-operate return-uw" to={`${BASE_PAGE_DIR}/express/${this.props.source.id}/1`}>返回内衣</Link>)
          } else {
            row_3 = (<span></span>)
          }
          price = <div className="price arial">&yen;{`${this.props.source.deposit}`}<i className="iconfont icon-close"/>{this.props.source.count}</div>
        }

        break;
      case '3':
        if (itemType == 1) {
          row_1 = (<Link to={`${BASE_PAGE_DIR}/order/${this.props.oid}`}><i className="iconfont icon-gt"></i></Link>)
          row_3 = (<div className="create-time">{this.props.ts}</div>)
          price = <div className="price arial">&yen;{`${this.props.source.price}`}<i className="iconfont icon-close"/>{this.props.source.count}</div>
        } else if (itemType == 2) {
          row_1 = (<div className="prepay-icon">押</div>)
          row_2 = (<i></i>)
          row_3 = (<div className="create-time">{this.props.ts}</div>)
          price = <div className="price arial">&yen;{`${this.props.source.deposit}`}<i className="iconfont icon-close"/>{this.props.source.count}</div>
        }
        break;


    }



    return (
      <div className="order-item-container">
        <div className="column">
          <div className="img-wrap">
            {
              pageType=="2"?
              (<Link to={`${BASE_PAGE_DIR}/underwear/${this.props.source.gid}`}><img src={this.props.source.main_img} /></Link>):
              (<img src={this.props.source.main_img} />)
            }
          </div>
        </div>
        <div className="column">
          <div className="row-wrap">
            {
              pageType=="2"?
              (<Link to={`${BASE_PAGE_DIR}/underwear/${this.props.source.gid}`} className="pro-name">{this.props.source.name}</Link>):
              (<div className="pro-name">{this.props.source.name}</div>)
            }

            <div className="order-justify-wrap">
            {row_1}
            </div>
          </div>
          <div className="row-wrap">
            <div className="size-wrap">
              尺码：<span className="arial pl5">{this.props.source.size.replace('-', '')}</span>
            </div>
            <div className="order-justify-wrap">
              {row_2}
            </div>
          </div>
          <div className="row-wrap">
              {price}
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
