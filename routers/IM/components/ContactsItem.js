import React from 'react'
import {
  BASE_PAGE_DIR
} from 'macros.js'

import {getTimeLabel} from 'util.js'
import './ContactsItem.less'
class ContactsItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {

    let source = this.props.source
    let lable = getTimeLabel(source.ts * 1000, false);
    return (
			<a className="contacts-wraper"
        href={`${BASE_PAGE_DIR}/im/${source.sender}`}
        data-source={JSON.stringify(source)}
        data-index={source.index}
        data-id={source.id}
      >
				<div
					className="avater"
					style={{backgroundImage: `url(${source.headimg})`}}
				>
				</div>
				<div className="other-wraper">
					<div className="user-name">{source.name}</div>
					<div className="date-wraper">{lable}</div>
					<div className="newest-msg">
						<p>{source.img? '[图片]' : source.txt}</p>
						<div className="unread-num"></div>
					</div>
				</div>
			</a>
    )
  }
}
ContactsItem.defaultProps = {
  source: {
    backgroundImage: '',
    name: '蜜豆',
    ts: Math.floor(Date.now() / 1000) ,
    txt: 'welcome 蜜豆'

  }
}
export default ContactsItem
