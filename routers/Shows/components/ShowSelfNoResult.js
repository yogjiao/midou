import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'

import 'ShowSelfNoResult.less'
class ShowSelfNoResult extends React.Component {
  render() {
    return (
      <div className="showself-null-wrap" >
        <div className="img-bg" style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/null-show.png)`}}></div>
      </div>
    )
  }
}

export default ShowSelfNoResult
