module.exports = {
  path: 'shopping-cart/:actionModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ShoppingCart.js'))
    })
  }
}
