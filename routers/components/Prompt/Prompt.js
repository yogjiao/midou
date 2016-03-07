import React from 'react'
import ReactDOM from 'react-dom'
import {PropTypes} from 'react'

import './Prompt.less'

class Prompt extends React.Component {
  show = () => {
    let panel = this.refs['prompt-container']
    setTimeout(() => {
      panel.classList.add('on')
    },10)
    setTimeout(() => {
      panel.classList.remove('on')
    }, 1500)
  };
  render() {
    return (
      <div className="prompt-container" ref="prompt-container">
        <p className="text-wrap">{this.props.msg}</p>
      </div>
    )
  }
}
Prompt.defaultProps = {
  msg: '蜜豆欢迎您'
}
export default Prompt
