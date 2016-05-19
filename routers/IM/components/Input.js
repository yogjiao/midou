import React from 'react'

import './Input.less'
class Input extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  textareaChangeHandler = (e) => {
    let textarea = e? e.target : document.querySelector('#textarea')
    textarea.style.height = 0
    let h = textarea.scrollHeight
    textarea.style.height = h + 'px'
    if (textarea.value) {
      this.refs['btn-post'].style.display = 'block'
      this.refs['icon-add'].style.display = 'none'
      this.props.hideMediaWraper();
    } else {
      this.refs['btn-post'].style.display = 'none'
      this.refs['icon-add'].style.display = 'block'
    }
  };
  render() {
    return (
			<div className="im-input-container">
				<div className="input-wraper">
					<textarea
						placeholder="请输入聊天内容..."
						className="txt-area"
						ref="textarea"
            id="textarea"
						onChange={this.textareaChangeHandler}
					/>
					<div className="btn-wraper">
						<i className="iconfont icon-add open-media-wraper" ref="icon-add"></i>
						<div className="btn-post" ref="btn-post">发送</div>
					</div>
				</div>
				<div
          className={this.props.isHiddenMediaWraper? 'media-wraper none' : 'media-wraper'}
        >
					<i className="iconfont icon-camera media-item" />
					<i className="iconfont icon-photo media-item" />
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
