module.exports = {
  path: 'carts(/:actionModel)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ShoppingCart.js'))
    })
  },
  onEnter(nextState, replace) {
   if (!nextState.params.actionModel) {
     nextState.params.actionModel = 'scan'
   }
  }
}
