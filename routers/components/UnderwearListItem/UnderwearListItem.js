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
        <div className="img-wrap" style={{height: height}}>
          <a
            href={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}
            style={{backgroundImage: img}}
          ></a>
        </div>
        <div className="info-wrap">
          <a
            href={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}
            className="pro-name"
          >
            {this.props.source.name}
          </a>
          <div className="price">&yen;{this.props.source.price}</div>
        </div>
      </div>
    )
  }
}

export default UnderwearListItem
