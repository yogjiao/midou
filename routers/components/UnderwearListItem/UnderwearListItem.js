import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'
import './UnderwearListItem.less'

class UnderwearListItem extends React.Component {

  render() {
    let img = `url(${this.props.source.main_img})`
    return (
      <div className="uw-list-item" >
        <div className="img-wrap">
          <a
            href={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}
            style={{backgroundImage: img}}
          ></a>
        </div>
        <div className="info-wrap">
          <a
            href={`${BASE_PAGE_DIR}/underwear/${this.props.source.id}`}
            className="pro-name single-ellipsis"
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
