import React from 'react'
import ReactDOM from 'react-dom'
import {PropTypes} from 'react'
import {BASE_PAGE_DIR} from 'macros.js'
import './Nav.less'

class Nav extends React.Component {

  render() {
    return (
      <div className="nav-container">
        <a
          className={window.location.pathname == `${BASE_PAGE_DIR}/scene/0` ? 'on' : ''}
          href={`${BASE_PAGE_DIR}/scene/0`}
        >
          <i className={window.location.pathname == `${BASE_PAGE_DIR}/scene/0` ? 'iconfont icon-shouyedown' : 'iconfont icon-shouye'}/>
          <span>首页</span>
        </a>
        <a
          className={window.location.pathname == `${BASE_PAGE_DIR}/underwears` ? 'on' : ''}
          href={`${BASE_PAGE_DIR}/underwears`}
        >
          <i className={window.location.pathname == `${BASE_PAGE_DIR}/underwears` ? 'iconfont icon-danpindown' : 'iconfont icon-danpin'}/>
          <span>单品</span>
        </a>
        <a
          className={window.location.pathname == `${BASE_PAGE_DIR}/carts` ? 'on' : ''}
          href={`${BASE_PAGE_DIR}/carts`}
        >
          <i className={window.location.pathname == `${BASE_PAGE_DIR}/carts` ? 'iconfont icon-gouwuchedown' : 'iconfont icon-gouwuche'}/>
          <span>购物车</span>
        </a>
        <a
          className={window.location.pathname == `${BASE_PAGE_DIR}/ihome` ? 'on' : ''}
          href={`${BASE_PAGE_DIR}/ihome`}
        >
          <i className={window.location.pathname == `${BASE_PAGE_DIR}/ihome` ? 'iconfont icon-wodown' : 'iconfont icon-wo'}/>
          <span>我</span>
        </a>



      </div>
    )
  }
}
export default Nav
