module.exports = {
  path: 'buyings',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Buyings.js'))
    })
  }
}
