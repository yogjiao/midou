module.exports = {
  path: 'patent',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Patent.js'))
    })
  }
}
