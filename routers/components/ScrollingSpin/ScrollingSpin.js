import React from 'react'

import './ScrollingSpin.less'

class ScrollingSpin extends React.Component {
  render() {
    let style = {}
    style.display = this.props.isHidden? 'none' : 'block'
    return (
      <div className="scrolling-spin" >
         <div style={style}>加载中...</div>
      </div>
    )
  }
}

export default ScrollingSpin
