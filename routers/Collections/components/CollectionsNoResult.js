import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'

import 'CollectionsNoResult.less'
class CollectionsNoResult extends React.Component {
  render() {
    return (
      <div className="collections-null-wrap">
        <img src={`${BASE_STATIC_DIR}/img/null-collections.png`} />
      </div>
    )
  }
}

export default CollectionsNoResult
