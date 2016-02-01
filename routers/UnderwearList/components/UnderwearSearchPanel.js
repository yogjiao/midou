import React from 'react'


import './UnderwearSearchPanel.less'

// import fetch from '../../components/fetch.js'

class UnderwearSearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: ['聚拢', '无痕', '侧收', '美背', '薄杯', '运动', '无钢圈'],
      searchParams: {
        baseSize: '',
        braSize: '',
        tags:''
      }
    }

  }
  render() {
    return (
      <div className="uw-search-panel">
        <div className="overlayer bg-blur"></div>

        <div className="panel-Wrap">
          <div className="bottom-size">
            <div className="line"></div>
            <ul className="circles">
              <li className="on">
                <div className="circle"></div>
                <div className="lable">70</div>
              </li>
              <li>
                <div className="circle"></div>
                <div className="lable">75</div>
              </li>
              <li>
                <div className="circle"></div>
                <div className="lable">80</div>
              </li>
              <li>
                <div className="circle"></div>
                <div className="lable">85</div>
              </li>
            </ul>
            <div className="slide-box"></div>
          </div>
          <div className="bra-size">
            <div className="circles">
              <div className="circle on">A</div>
              <div className="circle">B</div>
              <div className="circle">C</div>
              <div className="circle">D</div>
            </div>
          </div>
          <div className="tags">
            <ul className="clearfix">
              {(() => {
                let tagsList = this.state.allTags.map(()=>{
                  
                })
              })()}
            </ul>
          </div>
          <div className="btn-wrap"><div className="btn-sure">确定</div></div>
          <i className="iconfont">&#xe601;</i>
        </div>
      </div>
    )
  }
}

export default UnderwearSearchPanel
