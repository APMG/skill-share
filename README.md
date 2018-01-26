# Alexa Skill Share

This library is intended to provide some tools to make it eash to compose various intents and state handlers into an Alexa lambda handler.

In theory you should be able to make a streaming skill with the

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
  STATION_NAME: 'Station name', // e.g., "The Current"
  STREAM_URL: 'www.yourstream.url/goes/here.mp3',
  CARD_TITLE: 'The Title For Your Cards',
  CARD_CONTENT: 'The content that goes inside your cards.',
  SPOKEN_WELCOME: 'Welcome to your station',
  SPOKEN_HELP: 'This skill does thus and so, and you can do such and such',
  SPOKEN_UNHANDLED: 'I don\'t know how to interpret that',
  SPOKEN_CANNOT_FIND: 'Sorry, I can\'t find that information right now',
  SPOKEN_ILLOGICAL: 'I can\'t do that - this is a live stream'
}
