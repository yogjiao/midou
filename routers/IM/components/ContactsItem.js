import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR
} from 'macros.js'
import {fetchable} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')

import {getUserInfoFromApp} from 'webviewInterface.js'

import './ContactsItem.less'
class ContactsItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let source = this.props.source
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
					<div className="date-wraper">{source.ts}</div>
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
