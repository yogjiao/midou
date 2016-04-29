import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR
} from 'macros.js'
import {fetchable} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')

import {getUserInfoFromApp} from 'webviewInterface.js'

import './Input.less'
class Input extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  render() {
    return (
			<div className="im-input-container">
				<div className="input-wraper">
					<textarea
						placeholder="请输入聊天内容..."
						className="txt-area"
						ref="textarea"
						onChange={this.autoHeightHandler}
					/>
					<div className="btn-wraper">
						<i className="iconfont icon-add" ref="icon-add"></i>
						<div className="btn-post" ref="btn-post">发送</div>
					</div>
				</div>
				<div className="media-wraper">
					<i className="iconfont icon-collection" />
					<i className="iconfont icon-collection" />
				</div>
			</div>
    )
  }
}
// Home.childContextTypes = {
//     pageSpin: React.PropTypes.node.isRequired
//   }
// Home.contextTypes = {
//     name: React.PropTypes.string.isRequired,
//     //router: React.PropTypes.func.isRequired
// }
// Home.context = {
//   //pageSpin: pageSpin
// }
export default Input
