# Alexa Skill Share

This library is intended to provide some tools to make it eash to compose various intents and state handlers into an Alexa lambda handler.

```js
var skillShare = require('skill-share')
var intents = skillShare.intents
var config = require('./my-config')

var handler = skillShare.handler('', [
  intents.defaultBuiltIns,
  intents.builtInAudio,
  intents.askShow,
  intents.askSong
])

exports.handler = skillShare
  .skill(config)
  .addHandler(handler)
  .create()
```
