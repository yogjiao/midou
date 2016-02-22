import React from 'react'
import ReactDOM from 'react-dom'

import './Selection.less'

class Selection extends React.Component {
  hide = () => {
    ReactDOM.findDOMNode(this.refs['select-bg-layout']).style.display='none';
  };
  show = () => {
      ReactDOM.findDOMNode(this.refs['select-bg-layout']).style.display='block';
  };
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
                  <div><i className="iconfont">&#xe601;</i></div>
                  <div
                    data-value={item.value}
                  >
                    {item.text}
                  </div>
                </li>
              )
      })
        break;
      default:

    }

    return (
      <div
        className={'select-bg-layout' + ' ' + 'item-type-' + this.props.itemType}
        ref="select-bg-layout"
      >
        <div className="select-container" ref="select-container">
           <div className="select-header">选择年龄</div>
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
