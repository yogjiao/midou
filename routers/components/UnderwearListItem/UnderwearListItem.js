import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'
import './UnderwearListItem.less'

class UnderwearListItem extends React.Component {

  render() {
    let img = `url(${this.props.source.main_img})`
    let height = (Math.min(window.innerWidth, 640) - 30)  * 0.48 + 'px'
    return (
      <div className="uw-list-item" >
        <Link
          className="img-wrap"
          to={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}
          style={{backgroundImage: img, height: height}}
        >
        </Link>
        <div className="info-wrap">
          <Link
            to={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}
            className="pro-name"
          >
            {this.props.source.name}
          </Link>
          <div className="price">&yen;{this.props.source.price}</div>
        </div>
      </div>
    )
  }
}

export default UnderwearListItem
