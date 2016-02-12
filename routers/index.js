import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

//import ocBridge from './components/WebViewJavascriptBridge.js'

import 'es6-promise'
import 'whatwg-fetch'
import fastclick  from 'fastclick'
//React.initializeTouchEvents(true);
fastclick(document.body);

import '../page/index.less'

import App from './App/App.js'
import Home from './Home/Home.js'


const rootRoute = {
  component: App,
  childRoutes: [ {
    path: '/page',
    //component: require('../routers/Home'),
    //component: require('./App/App.js'),
    indexRoute: { component: Home },//require('./Home/Home.js')
    childRoutes: [
      require('./UnderwearList'),
      require('./UnderwearDetial')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
