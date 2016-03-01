import React from 'react'
import { Link } from 'react-router'


import './Age.less'
class Nighty extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>你常穿睡衣尺码是</h2>
         <div className="select-wrap" data-feature-name="sleepwear_size">
           <span>{this.props.source.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default Nighty
