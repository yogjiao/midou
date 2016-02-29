module.exports = {
  path: 'order/:goodsIds',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderCreated.js'))
    })
  },
  onEnter: function (nextState, replace) {
    let receiver
    try {
      receiver = JSON.parse(localStorage.getItem('receiver')) || {}
    } catch(err) {
      receiver = {}
    }
      nextState.params.receiver = receiver
      localStorage.clear()
  }
}
