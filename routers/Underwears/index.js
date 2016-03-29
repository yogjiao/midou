import {BASE_PAGE_DIR} from 'macros.js'
//http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteMatching.html
/*
<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
*/
module.exports = {
  path: 'search(/:size/:category/:tags)',
  // path: /.*/,
  //indexRoute: { onEnter: (nextState, replace) => replace(`${BASE_PAGE_DIR}/underwears/0/0/0`) },
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('Underwears.js'))
    })
  }
}
