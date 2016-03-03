module.exports = {
  path: 'collections',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../Underwears/components/Underwears.js'))
    })
  }
}
