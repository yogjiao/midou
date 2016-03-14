module.exports = {
  path: 'collections',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('Collections.js'))
    })
  }
}
