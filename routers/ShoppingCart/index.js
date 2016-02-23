module.exports.created = {
  path: 'carts',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ShoppingCart.js'))
    })
  }
}
module.exports.edited = {
  path: 'carts/:actionModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ShoppingCart.js'))
    })
  }
}
