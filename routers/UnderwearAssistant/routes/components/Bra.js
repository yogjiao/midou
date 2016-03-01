import React from 'react'
import { Link } from 'react-router'


import './Age.less'
class Base extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>你常穿文胸尺码是</h2>
         <div className="select-wrap" data-feature-name="bottom_bust">
           <span>{this.props.source.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
         <div className="select-wrap" data-feature-name="cup">
           <span>{this.props.source_1.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default Base
