import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR} from 'macros.js'

import 'BuyingsItem.less'
class BuyingsItem extends React.Component {
  render() {
    return (
      <li className="buyings-item-wrap">
        <div className="buyings-item" data-index={this.props.index} data-is-selected={this.props.isSelected}>
          <div className="col-1">
            <i className= {this.props.isSelected ? "iconfont icon-radio-on" : "iconfont icon-radio"}/>
          </div>
          <div className="col-2">
            <div className="bg-wrap"
              style={{backgroundImage: `url(${this.props.main_img})`}}
            />
          </div>
          <div className="col-3">
            <div className="pro-name">{this.props.name}</div>
            <div className="pro-size">size:<span>{this.props.size}</span></div>
            <div className="time-wrap">{this.props.ts}</div>
          </div>
        </div>
        {
          this.props.isDisable? (<div className="overlayer"></div>) : ''
        }

      </li>
    )
  }
}

export default BuyingsItem
