import React from 'react'
import {Link} from 'react-router'
import {BASE_PAGE_DIR, ROUTER_RECIEVER_INFO_EDIT, RECEIVERS_EDIT} from 'macros.js'

import './ReceiversItem.less'
class ReceiversItem extends React.Component {
  render() {
    return (
      <li className="receivers-item" data-source={JSON.stringify(this.props)}>
        <div className="column">
           <div>{this.props.name}</div>
           <div className="arial">{this.props.phone}</div>
           <div>{this.props.address}</div>
        </div>
        {
          this.props.receiversModel == RECEIVERS_EDIT?
           (
             <div className="column">
               <i className="iconfont btn-edit">
                 <Link to={`${BASE_PAGE_DIR}/receiver/${this.props.id}/${ROUTER_RECIEVER_INFO_EDIT}`}>&#xe601;</Link>
               </i>
               <i className="iconfont btn-delete" data-id={this.props.id} data-index={this.props.index}>&#xe608;</i>
             </div>
           ):
           ''
        }

      </li>
    )
  }
}

export default  ReceiversItem
