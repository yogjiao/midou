module.exports = {
  path: 'underwear-list',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UnderwearList.js'))
    })
  }
}
