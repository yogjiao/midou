import React from 'react'
import ReactDOM from 'react-dom'
import {PropTypes} from 'react'

import './Confirm.less'

class Confirm extends React.Component {
  cancelHandler = () => {
    this.refs['confirm-container'].style.display = 'none'
  };

  render() {
    return (
      <div className="confirm-container" ref="confirm-container">
        <div className="text-wrap">{this.props.msg}</div>
        <div className="btn-wrap">
          <div className="btn-confirm" onClick={this.props.confirmHandler}>确定</div>
          <div className="btn-cancel" onClick={this.props.cancelHandler || this.cancelHandler}>取消</div>
        </div>
      </div>
    )
  }
}
Confirm.propTypes = {
    confirmHandler: PropTypes.func
  }
Confirm.defaultProps = {
  msg: '你确定要删除吗？'

}
export default Confirm
