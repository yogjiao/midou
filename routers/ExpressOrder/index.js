module.exports = {
  path: 'express/:orderId/:isTry', //isTry 0 / 1
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ExpressOrder.js'))
    })
  }
}
