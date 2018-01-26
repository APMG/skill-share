var Alexa = require('alexa-sdk')
var states = require('../states')
var basePodcastAudioHandlers = require('./base-podcast-audio-intents')
var basePodcastHandler = require('./base-podcast')
var playPodcast = require('../intents/play-podcast').default

exports.default = function (config, customHandlers) {
  var handlers = getHandlers(config, customHandlers)
  return Alexa.CreateStateHandler(states.PODCAST, handlers)
}

function getHandlers (config, customHandlers) {
  return Object.assign(
    {},
    basePodcastAudioHandlers(config),
    basePodcastHandler(config),
    playPodcast(config),
    customHandlers
  )
}
