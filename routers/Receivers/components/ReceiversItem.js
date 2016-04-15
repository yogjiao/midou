import React from 'react'
import {Link} from 'react-router'
import {BASE_PAGE_DIR, UPDATE, SELECT} from 'macros.js'

import './ReceiversItem.less'
class ReceiversItem extends React.Component {
  render() {
    return (
      <li className="receivers-item" >
        <div className="receivers-item-wrap">
          {

            this.props.actionModel == SELECT?
            (
              <div className="info-wrap receiver-select" data-source={JSON.stringify(this.props)}>
                 <div className="receiver-name">{this.props.name}</div>
                 <div className="receiver-phone arial">{this.props.phone}</div>
                 <div className="receiver-address">{this.props.address}</div>
              </div>
            ):
            (
              <a className="info-wrap" href={`${BASE_PAGE_DIR}/receiver/${this.props.id}/${UPDATE}`}>
                 <div className="receiver-name">{this.props.name}</div>
                 <div className="receiver-phone arial">{this.props.phone}</div>
                 <div className="receiver-address">{this.props.address}</div>
              </a>
            )
          }

          <div className="action-wrap">
            <a
              className="iconfont icon-edit"
              href={`${BASE_PAGE_DIR}/receiver/${this.props.id}/${UPDATE}`}
            />
            <i
              className="iconfont icon-delete"
              data-id={this.props.id}
              data-index={this.props.index}
            />
          </div>
        </div>

      </li>
    )
  }
}

export default  ReceiversItem
