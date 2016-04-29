import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR
} from 'macros.js'
import {fetchable} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')

import {getUserInfoFromApp} from 'webviewInterface.js'
import ContactsItem from 'ContactsItem.js'
import './Contacts.less'
class Contacts extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
			<div className="contacts-container">
				<h2>联系人</h2>
				<div className="contacts-list">
					<ContactsItem />
					<ContactsItem />
					<ContactsItem />
					<ContactsItem />
					<ContactsItem />
					<ContactsItem />
				</div>
			</div>
    )
  }
}

export default Contacts
