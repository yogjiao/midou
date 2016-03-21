import React from 'react'
import { Link } from 'react-router'
import {BASE_STATIC_DIR} from 'macros.js'

import './Age.less'
class UpperBust extends React.Component {
  render() {
    let img = `url(${BASE_STATIC_DIR}/img/upper-bust.png)`
    return (
      <div className="age-container">
         <h2>你的上胸围</h2>
         <div className="img-wrap" style={{backgroundImage: img}} />
         <div className="select-wrap" data-feature-name="upper_bust">
           <span>{this.props.source.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default UpperBust
