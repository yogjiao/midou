import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

//React.initializeTouchEvents(true);
//import ocBridge from './components/WebViewJavascriptBridge.js'

//pollyfill
import 'es6-promise'
import 'whatwg-fetch'

//enhance
import fastclick  from 'fastclick'

//init
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
      require('./UnderwearDetial'),
      require('./ShoppingCart')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
