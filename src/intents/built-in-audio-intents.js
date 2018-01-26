var directives = require('../directives')
var addPlayDirective = directives.addPlayDirective
var stop = directives.stop
var say = directives.say

var config

exports.default = function (stationConfig) {
  config = stationConfig
  return builtIns
}

const builtIns = {
  'AMAZON.ResumeIntent': function () {
    addPlayDirective(this, config.STREAM_URL)
    this.emit(':responseReady')
  },
  'AMAZON.PauseIntent': function () { stop(this) },
  'AMAZON.StopIntent': function () { stop(this) },
  'AMAZON.NextIntent': function () { cannotDoForLiveStream(this) },
  'AMAZON.PreviousIntent': function () { cannotDoForLiveStream(this) },
  'AMAZON.LoopOnIntent': function () { cannotDoForLiveStream(this) },
  'AMAZON.LoopOffIntent': function () { cannotDoForLiveStream(this) },
  'AMAZON.ShuffleOnIntent': function () { cannotDoForLiveStream(this) },
  'AMAZON.ShuffleOffIntent': function () { cannotDoForLiveStream(this) },
  'AMAZON.StartOverIntent': function () { cannotDoForLiveStream(this) },
  'PlaybackNearlyFinished': function () {},
  'PlaybackStarted': function () { },
  'PlaybackStopped': function () { }
}

function cannotDoForLiveStream (context) {
  say(context, config.SPOKEN_ILLOGICAL)
}
