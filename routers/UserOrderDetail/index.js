module.exports = {
  path: 'order-detail/:orderId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderDetail.js'))
    })
  }
}
