import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, EDIT, SCAN, BASE_PAGE_DIR, CUSTMER_SERVICE_ID} from 'macros.js'
import {
  getMiDouToken,
  getUserIdFromMidouToken
} from 'commonApp.js'

import './MoreMenu.less'
class MoreMenu extends React.Component {

  render() {
    return (
      <div className="more-menu" onClick={this.props.thisHandler}>
				<div className="more-menu-container">
					<div className="selections">
						<div>
							<i className="iconfont icon-share" />
							<span>分享</span>
						</div>
            {
              getUserIdFromMidouToken(getMiDouToken()) == this.props.userId ?
                (
                  <div>
      							<i className="iconfont icon-delete" />
      							<span>删除</span>
      						</div>
                ) : ''
            }
            <a href={`${BASE_PAGE_DIR}/im/${CUSTMER_SERVICE_ID}`}>
							<i className="iconfont icon-jubaogantanhao" />
							<span>举报</span>
						</a>
					</div>
					<div className="cancel-selection">取消</div>
				</div>
      </div>
    )
  }
}

export default MoreMenu
