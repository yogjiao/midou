module.exports = {
  path: 'scene/:sceneId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Home.js'))
    })
  }
}
