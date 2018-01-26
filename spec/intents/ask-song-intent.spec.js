var nock = require('nock')
var playlistFx = require('../fixtures/playlist.json')
var virtualAlexa = require('../virtual-alexa')

describe('Ask song intent', function () {
  it('Returns song info', function(done) {
    var alexa = virtualAlexa()
    var httpMock = nock('https://nowplaying.publicradio.org')
      .get('/test-config/playlist')
      .reply(200, playlistFx.body, playlistFx.headers)

    const askSong = alexa.intend("AskSongIntent").then((payload) => {
      var ssml = '<speak> Now playing Desire by Kamasi Washington from the album Harmony of Difference </speak>'
      expect(payload.response.outputSpeech.ssml).toEqual(ssml)
      httpMock.done()
      done()
    });
  })
})
