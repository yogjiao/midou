module.exports = {
  path: 'underwear-list',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UnderwearList.js'))
    })
  }
}
