import React from 'react'
import ReactDOM from 'react-dom'

import './Selection.less'

class Selection extends React.Component {
  render() {
    let itemList
    switch ('' + this.props.itemType) {
      case '1':
      itemList = this.props.source.map((item, index) => {
        let isSelected = this.props.selectedIndex == index? true : false;
        let source = typeof item == 'object'? JSON.stringify(item) : item;
        return (
                <li
                  key={index}
                  data-index={index}
                  className={isSelected? 'select-item-wrap on' : 'select-item-wrap'}
                  data-source={source}
                >
                  <div><i className="iconfont icon-right"></i></div>
                  <div
                    data-value={item.value}
                    dangerouslySetInnerHTML={{__html: item.text}}
                  >
                  </div>
                </li>
              )
      })
        break;
     case '2':
     itemList = this.props.source.map((item, index) => {
       let isSelected = this.props.selectedIndex == index? true : false;
       let source = typeof item == 'object'? JSON.stringify(item) : item;
       return (
               <li
                 key={index}
                 data-index={index}
                 className={isSelected? 'select-item-wrap on' : 'select-item-wrap'}
                 data-source={source}
               >
                 {item.text}
               </li>
             )
     })
        break;
     default:

    }

    let style = {}
    style.display = this.props.isHidden? 'none' : 'block'
    return (
      <div
        style={style}
        className={'select-bg-layout' + ' ' + 'item-type-' + this.props.itemType}
        onClick={this.props.selectionHandler}
      >
        <div className="select-over-layer"/>
        <div className="select-container" ref="select-container">
           <div className="select-header">{this.props.title}</div>
           <div className="select-body-wrap">
             <ul className="select-body">
                {itemList}
             </ul>
           </div>
        </div>
      </div>
    )
  }
}

export default Selection
