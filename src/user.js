var got = require('got')
var get = require('lodash.get')

var apiUrl = 'https://accounts.publicradio.org/api/v1/'

module.exports = function (handler) {
  return {
    getToken: function (customMsg) {
      var token = get(handler, 'event.session.user.accessToken')

      if (token) {
        return token
      }

      var defaultMsg = 'You need to link your APM account to this skill before you can do that'
      handler.emit(
        ':tellWithLinkAccountCard',
        customMsg || defaultMsg
      )

      // If a client function receives this `false` response here, it should
      // immediately `return` to make sure code execution actually ceases
      // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/208#issuecomment-341231525
      // ~EMN
      return false
    },
    getUser: function (handleSuccess, handleError) {
      var token = this.getToken(this)

      if (!token) { return } // cease lambda execution immediately

      if (!handler.attributes['user']) {
        var requestConfig = {
          headers: {
            authorization: 'Bearer ' + token,
            timeout: 2500,
            'content-type': 'application/json'
          },
          json: true
        }

        var url = apiUrl + 'me'

        got(url, requestConfig).then(handleSuccess, handleError)
      }
    }
  }
}
