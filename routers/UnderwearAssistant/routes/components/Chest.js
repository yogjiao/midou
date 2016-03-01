import React from 'react'
import { Link } from 'react-router'
import AssistantSlideSelection from 'AssistantSlideSelection.js'

import './Age.less'
class Chest extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>{this.props.tips}</h2>
         <div className="img-wrap">
           <img src={this.props.img} />
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
