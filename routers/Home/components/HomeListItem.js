import React from 'react'
import {Link} from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'

import 'HomeListItem.less'
class HomeListItem extends React.Component {
  render() {
    let img = `url(${this.props.match_img})`
    let height = window.innerWidth - 30  + 'px'
    return (
      <li className="list-item">
        <a href={`${BASE_PAGE_DIR}/collocation/${this.props.id}`} className="img-wrap" style={{backgroundImage: img, height: height}}></a>
        <a href={`${BASE_PAGE_DIR}/collocation/${this.props.id}`} className="pro-name">
          <p>{this.props.name}</p>
          <i className="iconfont icon-gt"></i>
        </a>
      </li>
    )
  }
}

export default HomeListItem
