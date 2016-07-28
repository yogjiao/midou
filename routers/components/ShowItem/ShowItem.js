import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'
import './ShowItem.less'

class ShowItem extends React.Component {

  render() {
    return (
      <div className="show-list-item">
				<a href={`${BASE_PAGE_DIR}/show/${this.props.id}`} className="item-bg" style={{backgroundImage: `url(${this.props.img})`}}></a>
				<div className="meta-info">
					<div className="avatar" style={{backgroundImage: `url(${this.props.user.headimg})`}}/>
					<div className="user-name">{this.props.user.name}</div>

					{
            // <i className="iconfont icon-hot hot" />
            // <div className="like-num">10052</div>
          }
				</div>
        <i className={this.props.mediaType == 0? "media-type iconfont icon-mphoto" : "media-type iconfont icon-CloudVideo"} />
      </div>
    )
  }
}

export default ShowItem
