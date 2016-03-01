module.exports = {
  path: 'step/:stepId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('Step.js'))
    })
  },
  onEnter: function(nextState){
    
  },
  onLeave: function(){
  }
}
