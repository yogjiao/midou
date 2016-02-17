import React from 'react'
import ReactDom from 'react-dom'

import './UnderwearSearchPanel.less'
import * as util from 'util.js'
// import fetch from '../../components/fetch.js'

class UnderwearSearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBaseSize: ['70', '75', '80', '85'],
      allBraSize: ['A','B','C','D'],
      allTags: ['聚拢', '无痕', '侧收', '美背', '薄杯', '运动', '无钢圈', '情趣', '底裤'],
      searchParams: {
        baseSize: '70',
        braSize: 'A',
        tags:[1, 2]
      }
    }

  }

  componentDidMount() {
    ReactDom.findDOMNode(this).addEventListener('click', function(e){
      let target, sourceData
      if (target = util.getParentByClass(e.target, 'base-size')) {
        sourceData = Object.assign({}, this.state.searchParams, {baseSize: target.getAttribute('data-val')})

        let index = target.getAttribute('data-index')
        let slider = this.refs["slide-box"]
        let width = slider.parentNode.offsetWidth
        this.refs["slide-box"].style.left = target.offsetLeft - (slider.offsetWidth / 2 - 7) + 'px'
      } else if (target = util.getParentByClass(e.target, 'circle')){
        sourceData = Object.assign({}, this.state.searchParams, {braSize: target.getAttribute('data-val')})
      } else if (target = util.getParentByClass(e.target, 'tag')){
        if (target.classList.contains('on')) {
          let val = target.getAttribute('data-index')
          let index = this.state.searchParams.tags.findIndex((element, index, array)=>{
            return val == element
          })
          this.state.searchParams.tags.splice(index, 1)
          sourceData = Object.assign({}, this.state.searchParams)
        } else {
          this.state.searchParams.tags.push(target.getAttribute('data-index'))
          sourceData = Object.assign({}, this.state.searchParams)
        }

      }

      sourceData && this.setState({searchParams: sourceData});
    }.bind(this));
  }
  componentWillUnmount() {

  }
  closePanel(e) {
    ReactDom.findDOMNode(this).style.display = 'none';
  }
  render() {
    return (
      <div className="uw-search-panel" style={{display: 'none'}}>
        <div className="overlayer bg-blur"></div>

        <div className="panel-Wrap">
          <div className="bottom-size">
            <div className="line"></div>
            <div className="slide-box-wrap">
              <ul className="circles">

                {(() => {
                  return this.state.allBaseSize.map((val, index, tags)=>{
                    return (
                      <li key={index} data-index={index} className={(this.state.searchParams.baseSize == val)? 'base-size on' : 'base-size'} data-val={val}>
                        <div className="circle"></div>
                        <div className="lable">{val}</div>
                      </li>
                    )
                  })
                })()}
              </ul>
              <div className="slide-box" ref="slide-box"></div>
            </div>
          </div>
          <div className="bra-size">
            <div className="circles">
            {(() => {
              return this.state.allBraSize.map((val, index, tags)=>{
                return (
                  <div key={index} className={(this.state.searchParams.braSize == val)? 'circle on' : 'circle'} data-val={val}>
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
                return this.state.allTags.map((val, index, tags)=>{
                  return  (<li key={index} data-index={index}  className={(this.state.searchParams.tags.some(elem => elem == index))? 'tag on' : 'tag'}>{val}</li>)
                })
              })()}
            </ul>
          </div>
          <div className="btn-wrap"><div className="btn-sure" onClick={this.props.panelSearch}>确定</div></div>
          <i className="iconfont" ref="btn-close" onClick={this.closePanel.bind(this)}>&#xe601;</i>
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
