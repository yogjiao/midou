module.exports = {
  path: 'collocation',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('Collocation.js'))
    })
  }
}
