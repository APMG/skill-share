var directives = require('../directives')
var config

exports.default = function (stationConfig) {
  config = stationConfig
  return builtIns
}

const builtIns = {
  'LaunchRequest': function () {
    directives.addPlayDirective(this, config.STREAM_URL)
    this.response
      .cardRenderer(config.CARD_TITLE, config.CARD_CONTENT)
      .speak(config.SPOKEN_WELCOME || 'Welcome to ' + config.STATION_NAME)

    this.emit(':responseReady')
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':tell', config.SPOKEN_HELP)
  },
  'Unhandled': function () {
    this.emit(':tell', config.SPOKEN_UNHANDLED)
  },
  'AMAZON.CancelIntent': function () { directives.stop(this) },
  'SessionEndedRequest': function () {
    this.emit(':saveState', true)
  }
}
