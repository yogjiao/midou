import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, EDIT, SCAN} from 'macros.js'
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
					<ul className="selections">
						<li>
							<i className="iconfont icon-share" />
							<span>分享</span>
						</li>
            {
              getUserIdFromMidouToken(getMiDouToken()) == this.props.userId ?
                (
                  <li>
      							<i className="iconfont icon-delete" />
      							<span>删除</span>
      						</li>
                ) : ''
            }

					</ul>
					<div className="cancel-selection">取消</div>
				</div>
      </div>
    )
  }
}

export default MoreMenu
