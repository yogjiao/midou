import React from 'react'
import { Link } from 'react-router'


import './Age.less'
class Age extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>你的年龄</h2>
         <div className="select-wrap">
           <span>{this.props.source.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default Age
