var Alexa = require('alexa-sdk')
var intents = require('./intents')
var podcaster = require('./podcaster')
var createPodcastHandlers = require('./podcasts').default
var states = require('./states')
var user = require('./user')

const createLambdaHandler = function (config, handlers) {
  return function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback)
    alexa.appId = config.APP_ID
    if (Array.isArray(handlers)) {
      alexa.registerHandlers.apply(alexa, handlers)
    } else {
      alexa.registerHandlers(handlers)
    }
    if (config.DYNAMODB_TABLE_NAME) {
      alexa.dynamoDBTableName = config.DYNAMODB_TABLE_NAME
    }
    alexa.execute()
  }
}

module.exports = {
  createLambdaHandler,
  intents,
  podcaster,
  createPodcastHandlers,
  states,
  user
}
