import React from 'react'
import {Link} from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'

import 'HomeListItem.less'
class HomeListItem extends React.Component {
  render() {
    let img = `url(${this.props.match_img})`
    let height = window.innerHeight / 2 + 'px'
    return (
      <li className="list-item">
        <Link to={`${BASE_PAGE_DIR}/underwear/${this.props.id}`} className="img-wrap" style={{backgroundImage: img, height: height}}></Link>
        <Link to={`${BASE_PAGE_DIR}/underwear/${this.props.id}`} className="pro-name">
          <p>{this.props.name}</p>
          <i className="iconfont icon-gt"></i>
        </Link>
      </li>
    )
  }
}

export default HomeListItem
