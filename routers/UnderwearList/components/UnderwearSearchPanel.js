import React from 'react'
import ReactDom from 'react-dom'

import {
        UNDERWEAR_BRA_SIZE,
        UNDERWEAR_BASE_SIZE,
        UNDERWEAR_TAGS,
        UNDERWEAR_TYPES,
        UNDERWEAR_SIZE
      } from 'macros.js'
import './UnderwearSearchPanel.less'
// import fetch from '../../components/fetch.js'

class UnderwearSearchPanel extends React.Component {
  render() {
    let items
    if (this.props.category == '0' || this.props.category == '1') {
      items = (
        <div>
          <div className="bra-size">
            <div className="circles">
            {(() => {
              return UNDERWEAR_BASE_SIZE.map((val, index, tags)=>{
                return (
                  <div key={index}
                    className={(this.props.baseSize == val)?
                      'circle base-item on':
                      'circle base-item'}
                    data-val={val}
                  >
                    {val}
                  </div>
                )
              })
            })()}
            </div>
          </div>
          <div className="bra-size">
            <div className="circles">
            {(() => {
              return UNDERWEAR_BRA_SIZE.map((val, index, tags)=>{
                return (
                  <div key={index}
                    className={(this.props.braSize == val)?
                      'circle bra-item on':
                      'circle bra-item'}
                    data-val={val}>
                    {val}
                  </div>
                )
              })
            })()}
            </div>
          </div>
          <div className="tags">
            <ul className="clearfix">
              {(() => {
                return UNDERWEAR_TAGS.map((item, index, tags)=>{
                  return (
                    <li key={index}
                      data-index={index}
                      data-tag={item.id}
                      className={(this.props.tags.some(id => id == item.id))?
                        'tag on' :
                        'tag'}
                    >
                      {item.name}
                    </li>)
                })
              })()}
            </ul>
          </div>
        </div>
      )
    } else {
      items = (
        <div className="bra-size">
          <div className="circles">
          {(() => {
            return UNDERWEAR_SIZE.map((val, index, tags)=>{
              return (
                <div key={index}
                  className={(this.props.size == val)?
                    'circle size-item on':
                    'circle size-item'}
                  data-val={val}>
                  {val}
                </div>
              )
            })
          })()}
          </div>
        </div>
      )
    }


    return (
      <div className="uw-search-panel on"
        style={{display: (this.props.isHidden? 'none' : 'block ')}}
        onClick={this.props.searchHandler}
      >

        <div className="overlayer bg-blur"></div>
        <div className="panel-Wrap">
          <ul className="tags-wrap">
             {
               UNDERWEAR_TYPES.map((item, index) => {
                 return (
                   <li
                      key={index}
                      className={this.props.category == item.id? 'cat on' : 'cat'}
                      data-category={item.id}
                   >
                    {item.name}
                   </li>
                 )
               })
             }
          </ul>
          {items}
          <div className="btn-wrap">
            <div className="btn-sure"
              onClick={this.props.panelSearch}
            >
              确定
            </div>
          </div>
          <i className="iconfont btn-close">&#xe602;</i>
        </div>
      </div>
    )
  }
}

//https://facebook.github.io/react/docs/reusable-components.html
//https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html
//UnderwearSearchPanel.propTypes = { initialCount: React.PropTypes.number };
//UnderwearSearchPanel.defaultProps = { initialCount: 0 };


export default UnderwearSearchPanel
