module.exports = {
  path: 'business-model',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./BusinessModel.js'))
    })
  }
}
