var podcaster = require('../podcaster')
// var states = require('../states')
var cannotShuffleText = 'Sorry, I can\'t shuffle a podcast'
var cannotYetDo = 'Sorry, I can\'t do that yet'

module.exports = function () {
  return {
    'AMAZON.ResumeIntent': function () { podcaster(this).playLatest() },
    'AMAZON.PauseIntent': function () { podcaster(this).stop() },
    'AMAZON.StopIntent': function () { podcaster(this).stop() },
    'AMAZON.NextIntent': function () { this.emit(':tell', cannotYetDo) },
    'AMAZON.PreviousIntent': function () { this.emit(':tell', cannotYetDo) },
    'AMAZON.LoopOnIntent': function () { this.emit(':tell', cannotYetDo) },
    'AMAZON.LoopOffIntent': function () { this.emit(':tell', cannotYetDo) },
    'AMAZON.ShuffleOnIntent': function () { this.emit(':tell', cannotShuffleText) },
    'AMAZON.ShuffleOffIntent': function () { this.emit(':tell', cannotShuffleText) },
    'AMAZON.StartOverIntent': function () { podcaster(this).startOver() },
    'PlaybackNearlyFinished': function () {
      this.handler.state = ''
      this.emit(':saveState')
    }
  }
}
