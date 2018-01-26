const stationSlug = 'test-config'
module.exports = {
  APP_ID: 'amzn1.ask.skill.b81d3390-fac6-44f9-8f3e-24bb074a495b',
  STATION_SLUG: stationSlug,
  STATION_NAME: 'Station name', // e.g., "The Current"
  DEFAULT_SHOW_NAME: 'Default Show', // e.g., "Current Music" - what nowplaying returns when there's no "show"
  STREAM_URL: 'www.yourstream.url/goes/here.mp3',
  NOW_PLAYING_URL: 'https://nowplaying.publicradio.org/' + stationSlug,
  CARD_TITLE: 'The Title For Your Cards',
  CARD_CONTENT: 'The content that goes inside your cards.',
  SPOKEN_WELCOME: 'Welcome to your station',
  SPOKEN_HELP: 'This skill does thus and so, and you can do such and such',
  SPOKEN_UNHANDLED: 'I don\'t know how to interpret that',
  SPOKEN_CANNOT_FIND: 'Sorry, I can\'t find that information right now',
  SPOKEN_ILLOGICAL: 'I can\'t do that - this is a live stream',
  SPOKEN_ERROR: 'Something went wrong. I was unable to complete your request',
  HOST_PHONEMES: {
    'Lucia': 'lutS"i@',
    'Staruch': 'steIr\\Vk'
  },
  PODCASTS: [
    {
      'name': 'song of the day', // for identification in custom Podcast slot - value must be defined in skill interaction model
      'feedUrl': 'https://feeds.publicradio.org/public_feeds/song-of-the-day/rss/rss.rss',
      'behavior': null // FUTURE: Define podcast-specific behaviors like "serial" etc
    }
  ]
}
