module.exports = {
  path: 'collocation/:collocationId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('Collocation.js'))
    })
  }
}
