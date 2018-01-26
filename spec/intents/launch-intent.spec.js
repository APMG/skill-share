var nock = require('nock')
var playlistFx = require('../fixtures/playlist.json')
var virtualAlexa = require('../virtual-alexa')
var config = {
  APP_ID: 'amzn1.ask.skill.b81d3390-fac6-44f9-8f3e-24bb074a495b',
  STREAM_NAME: 'Stream name', // e.g., "The Current"
  STREAM_URL: 'www.yourstream.url/goes/here.mp3',
}

describe('Ask song intent', function () {
  it('Returns song info', function(done) {
    var alexa = virtualAlexa()
    const askSong = alexa.launch().then((payload) => {
      var resultUrl = payload.response.directives[0].audioItem.stream.url
      expect(resultUrl).toEqual(config.STREAM_URL)
      done()
    });
  })
})
