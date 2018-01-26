# Alexa Skill Share

This library is intended to provide some tools to reduce boilerplate and make it easy to compose various intents and state handlers into an Alexa lambda handler.

In theory you should be able to make a basic streaming skill with the following:

```js
// index.js

var skillShare = require('skill-share')

var config = {
  APP_ID: 'your-app-id',
  STREAM_NAME: 'Stream Name',
  STREAM_URL: 'www.yourstream.url/goes/here.mp3',
}

// The first param here is the state name
// Passing an empty string means the given
// intents will apply to the default state
var stateHandler = skillShare.stateHandler('', [
  skillShare.intents.defaultBuiltIns,
  skillShare.intents.builtInAudio
])

exports.handler = skillShare
  .skill(config)
  .addHandler(stateHandler)
  .create()
```

## Creating Custom Intents
An intent is a function that accepts a config object (you don't have to use it but you're going to get it anyway) and returns an object in which the keys are intent names and the values are handlers:

```js
// my-custom-intent.js

module.exports = function(config) {
  return {
    'MyCustomIntent': function() {
      this.emit(':tell', 'You are listening to ' + config.STREAM_NAME)
    }
  }
}
```
This can contain as many intent handlers as you like.

## Overriding Intents in a State Handler
Say you want to override a default intent in a particular state handler. If multiple intents are added with the same name, the one added last will be used.

First create the intent ...
```js
// my-help-intent.js

module.exports = function(config) {
  return {
    'AMAZON.HelpIntent': function() {
      // custom implementation
    }
  }
}
```

Then add it to the state handler
```js
var skillShare = require('skill-share')
var myHelpIntent = require('./my-help-intent.js')

var stateHandler = skillShare.stateHandler('', [
  skillShare.intents.defaultBuiltIns
])

stateHandler.addIntents([myHelpIntent])
```
