import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

//import ocBridge from './components/WebViewJavascriptBridge.js'


import '../routers/less/index.less'

import 'es6-promise'
import 'whatwg-fetch'
import fastclick  from 'fastclick'
//React.initializeTouchEvents(true);
fastclick(document.body);

const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/page',
    //component: require('../routers/Home'),
    indexRoute: { component: require('../routers/Home') },
    childRoutes: [
      require('../routers/UnderwearList'),
      //require('../routers/UnderwearDetial')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
