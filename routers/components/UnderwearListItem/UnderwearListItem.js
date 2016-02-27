import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'
import './UnderwearListItem.less'

class UnderwearListItem extends React.Component {
  render() {
    return (
      <div className="uw-list-item" >
        <div className="img-wrap">
          <Link to={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}><img src={this.props.source.main_img} alt="" /></Link>
        </div>
        <div className="info-wrap">
          <Link to={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`} className="pro-name">{this.props.source.name}-{this.props.source.category}</Link>
          <div className="price">&yen;{this.props.source.price}</div>
        </div>
      </div>
    )
  }
}

export default UnderwearListItem
