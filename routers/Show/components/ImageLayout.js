import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, EDIT, SCAN} from 'macros.js'

import 'ImageLayout.less'
class ImageLayout extends React.Component {

  render() {
    // let testImage = `${BASE_STATIC_DIR}/img/test.png`
    // let mode = 1
    // let els
    // let images = []
    //
    // for (var i = 0; i < mode; i++) {
    //   images[i] = testImage
    // }

    let els
    let images = []
    if (this.props.images) {
      images = this.props.images
    }
    let mode = images.length
    els = images.map((item, index) => {

      return <div className={`box-${index + 1}`} key={index} style={{backgroundImage: `url(${item})`}}></div>
    })

    return (
      <div className={`Image-layout mode-${mode}`} style={{width: `${window.innerWidth}px`, height: `${window.innerWidth}px`}}>
        {els}
      </div>
    )
  }
}

export default ImageLayout
