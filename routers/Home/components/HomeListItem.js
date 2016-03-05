import React from 'react'
import {Link} from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'

import 'HomeListItem.less'
class HomeListItem extends React.Component {
  render() {
    return (
      <li className="list-item" >
        <div className="img-wrap"><Link to={`${BASE_PAGE_DIR}/underwear/${this.props.id}`}><img src={this.props.match_img} alt="" /></Link></div>
        <Link to={`${BASE_PAGE_DIR}/underwear/${this.props.id}`} className="pro-name">
          <p>{this.props.name}</p>
          <i className="iconfont icon-gt"></i>
        </Link>
      </li>
    )
  }
}

export default HomeListItem
