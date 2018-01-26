var got = require('got')
var get = require('lodash.get')
var util = require('../util')
var replacePhonemes = util.replacePhonemes
var arrayToSentence = util.arrayToSentence

var config

exports.default = function (skillConfig) {
  config = skillConfig
  return {
    'AskShowIntent': function () {
      return got(config.NOW_PLAYING_URL + '/schedule')
        .then(
          handleResponse(this),
          handleError(this)
        )
    }
  }
}

function handleResponse (context) {
  return function (response) {
    let body = JSON.parse(response.body)
    let schedule = get(body, 'data.schedule', null)
    let program = schedule && schedule.length ? schedule[0] : null

    if (!program || !(program.people || program.shows)) {
      context.emit(':tell', config.SPOKEN_CANNOT_FIND)
    }

    let msg = buildMessage(program)
    context.emit(
      ':tellWithCard',
      'You are listening to ' + handleHostPhonemes(msg),
      'Now Playing',
      msg
    )
  }
}

function handleError (context) {
  return function (error) {
    context.emit(':tell', config.SPOKEN_ERROR)
  }
}

function buildMessage (program) {
  let show = program.shows[0]
  let msg = ''

  if (show && show.name !== config.DEFAULT_SHOW_NAME) {
    msg += show.name
  }

  if (program.people.length) {
    let names = program.people.map(function (person) { return person.name })
    let hosts = arrayToSentence(names)
    // if the show name is in the message, add "with" to it
    msg += msg.length ? ' with ' : ''
    // otherwise we just return the host name(s)
    msg += hosts
  }

  msg = msg.trim()

  return msg || config.STREAM_NAME
}

function handleHostPhonemes (hosts) {
  // if no hosts are configured with phonetic
  // pronunciations (meaning Alexa pronounces
  // them correctly by default), just return
  // the names as they are
  if (!config.HOST_PHONEMES) {
    return hosts
  }

  // otherwise, replace any instances of phonemes
  // with the configured phonetic values
  return replacePhonemes(hosts, config.HOST_PHONEMES)
}
