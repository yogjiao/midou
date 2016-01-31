import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

//import ocBridge from './components/WebViewJavascriptBridge.js'


import './less/index.less'

import 'es6-promise'
import 'whatwg-fetch'




const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./routers/Home'),
    childRoutes: [
      require('./routers/UnderwearList'),
      require('./routers/UnderwearDetial')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
