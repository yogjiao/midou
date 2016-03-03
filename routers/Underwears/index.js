module.exports = {
  path: 'underwears',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('Underwears.js'))
    })
  }
}
