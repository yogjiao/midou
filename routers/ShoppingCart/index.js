module.exports = {
  path: 'shopping-cart',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ShoppingCart.js'))
    })
  }
}
