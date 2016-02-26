import React from 'react'
import 'HomeListItem.less'

class HomeListItem extends React.Component {
  render() {
    return (
      <li className="list-item" >
        <div className="img-wrap"><a href={this.props.href}><img src={this.props.match_img} alt="" /></a></div>
        <a href={this.props.href} className="pro-name">
          <p>{this.props.name}{this.props.id}</p>
          <i className="iconfont">&#xe600;</i>
        </a>
      </li>
    )
  }
}

export default HomeListItem
