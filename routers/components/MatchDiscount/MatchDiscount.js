import React from 'react'
import './MatchDiscount.less'

class MatchDiscount extends React.Component {

  render() {
    return (
			<div className="match-discount">
				<i className="iconfont icon-exclamation-mark"/>
				<em>搭配内衣买内裤 每单</em>
				<span>立减5元~</span>！
			</div>
		)
  }
}

export default MatchDiscount
