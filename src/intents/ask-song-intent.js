var get = require('lodash.get')
var got = require('got')

var config
exports.default = function (stationConfig, customMessageSpec) {
  config = stationConfig
  if (customMessageSpec) {
    messageSpec = customMessageSpec
  }
  return {
    'AskSongIntent': function () {
      return got(config.NOW_PLAYING_URL + '/playlist')
        .then(
          handler(this),
          defaultError(this)
        )
    }
  }
}

const handler = function(context) {
  return function (response) {
    let body = JSON.parse(response.body)
    let songs = get(body, 'data.songs', null)

    if (!songs || !songs.length || !songs[0]) {
      context.emit(':tell', config.SPOKEN_CANNOT_FIND)
      return
    }
    let song = songs[0]
    let songDesc = song.title + " by " + song.artist
    if (song.album) {
      songDesc += " from the album " + song.album
    }
    context.emit(
      ':tellWithCard',
      'Now playing ' + songDesc,
      'Now Playing',
      songDesc
    )
  }
}

const defaultError = function(context) {
  return function (error) {
    context.emit(':tell', config.SPOKEN_ERROR)
  }

}
