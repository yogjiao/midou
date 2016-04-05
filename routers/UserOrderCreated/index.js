module.exports = {
  path: 'order-created/:goodsIds',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderCreated.js'))
    })
  },
  onEnter: function (nextState, replace) {
    let receiver, payWay
    try {
      receiver = JSON.parse(localStorage.getItem('receiver')) || {}
    } catch(err) {
      receiver = {}
    }
    try {
      payWay = localStorage.getItem('payWay') || ''
    } catch(err) {
      payWay = ''
    }
      nextState.params.receiver = receiver
      nextState.params.payWay = payWay
  }
}
