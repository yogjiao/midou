module.exports = {
  path: 'showself',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./ShowSelf.js'))
    })
  }
}
