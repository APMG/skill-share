var skillShare = require('../src/index')
var intents = require('../src/intents')
var config = require('./test-config')

var handler = skillShare.stateHandler('', [
  intents.defaultBuiltIns,
  intents.builtInAudio,
  intents.askShow,
  intents.askSong
])

exports.handler = skillShare
  .skill(config)
  .addHandler(handler)
  .create()
