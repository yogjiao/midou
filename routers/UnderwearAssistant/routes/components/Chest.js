import React from 'react'
import { Link } from 'react-router'
import {
  BASE_STATIC_DIR
} from 'macros.js'
import AssistantSlideSelection from 'AssistantSlideSelection.js'

import './Age.less'
class Chest extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>{this.props.tips}</h2>
         <div className="img-wrap">
           <img src={`${BASE_STATIC_DIR}/img/${this.props.imgs[this.props.selectedIndex]}`} />
         </div>
         <AssistantSlideSelection
           selectedIndex={this.props.selectedIndex}
           source={this.props.featureSource}
         />
      </div>
    )
  }
}

//module.exports = Home
export default Chest
