import React from 'react'
import {Link} from 'react-router'
import {BASE_PAGE_DIR, EDIT, SCAN} from 'macros.js'

import 'ShowSelfItem.less'
class ShowSelfItem extends React.Component {
  render() {
    let style = {}
    let coutainerWidth = document.querySelector('.pro-list').offsetWidth
    let gap = (window.innerWidth - coutainerWidth) / 2
    let width = (coutainerWidth - gap) / 2
    return (
      <li className="list-item" style={{width:　`${width}px`, height: `${width}px`}}>
        <div className="img-wrap" style={{backgroundImage: `url(${this.props.img})`}}></div>
        {
          this.props.model == EDIT?
          (
            <i
              className="iconfont icon-close"
              data-id={this.props.id}
              data-index={this.props.index}
            >
            </i>
          ) : ''
        }

      </li>
    )
  }
}

export default ShowSelfItem
