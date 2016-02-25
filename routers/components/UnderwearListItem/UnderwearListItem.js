import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import './UnderwearListItem.less'
let to = 'http://baidu.coms'
class UnderwearListItem extends React.Component {
  render() {
    return (
      <div className="uw-list-item" >
        <div className="img-wrap">
          <Link to={to}><img src={this.props.source.main_img} alt="" /></Link>
        </div>
        <div className="info-wrap">
          <Link to={to} className="pro-name">{this.props.source.name}</Link>
          <div className="price">&yen;{this.props.source.price}</div>
        </div>
      </div>
    )
  }
}

export default UnderwearListItem
