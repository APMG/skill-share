const stationSlug = 'test-config'
module.exports = {
  APP_ID: 'amzn1.ask.skill.b81d3390-fac6-44f9-8f3e-24bb074a495b',
  STATION_SLUG: stationSlug,
  STREAM_NAME: 'Station name', // e.g., "The Current"
  DEFAULT_SHOW_NAME: 'Default Show', // e.g., "Current Music" - what nowplaying returns when there's no "show"
  STREAM_URL: 'www.yourstream.url/goes/here.mp3',
  NOW_PLAYING_URL: 'https://nowplaying.publicradio.org/' + stationSlug,
  HOST_PHONEMES: {
    'Lucia': 'lutS"i@',
    'Staruch': 'steIr\\Vk'
  }
}
