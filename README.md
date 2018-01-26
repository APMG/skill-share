# Alexa Skill Share

This library is intended to provide some tools to make it eash to compose various intents and state handlers into an Alexa lambda handler.

In theory you should be able to make a basic streaming skill with the following:

```js
// index.js

var skillShare = require('skill-share')
var config = require('./config')

var handler = skillShare.handler('', [
  skillShare.intents.defaultBuiltIns,
  skillShare.intents.builtInAudio
])

exports.handler = skillShare
  .skill(config)
  .addHandler(handler)
  .create()
```

```js
// config.js

module.exports = {
  APP_ID: 'your-app-id',
  STREAM_NAME: 'Stream Name',
  STREAM_URL: 'www.yourstream.url/goes/here.mp3',
}
