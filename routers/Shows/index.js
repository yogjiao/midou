module.exports = {
  path: 'shows',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Shows.js'))
    })
  }
}
