var podcaster = require('../podcaster')
// var states = require('../states')
var config

module.exports = function (stationConfig) {
  config = stationConfig
  return {
    'LaunchRequest': function () {
      podcaster(this).playLatest()
    },
    'AMAZON.HelpIntent': function () {
      this.emit(':tell', 'You can play, pause, navigate back through older episodes, or say "Switch to Live Stream" to go back to Live Stream mode')
    },
    'AskShowIntent': tellInfo.bind(this),
    'AskSongIntent': tellInfo.bind(this),
    'SwitchToLiveStreamIntent': function () {
      this.handler.state = ''
      this.emitWithState('LaunchRequest')
    },
    'Unhandled': function () {
      this.emit(':tell', 'Sorry, I don\'t understand.')
    },
    'SongOfTheDayIntent': function () {
      var feedUrl = 'https://feeds.publicradio.org/public_feeds/song-of-the-day/rss/rss.rss'
      // this.handler.state = states.PODCAST
      podcaster(this).setCurrentPodcast(feedUrl)
    }
  }
}

function tellInfo () {
  var episode = podcaster(this).getCurrentEpisode()
  var podcast = podcaster(this).getCurrentPodcast()
  var station = config.STATION_NAME
  var msg = 'You are listening to ' +
    episode.title +
    ' from the ' +
    podcast.title +
    ' podcast, by ' +
    station

  this.emit(':tell', msg)
}
