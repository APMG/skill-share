var Alexa = require('alexa-sdk')
var get = require('lodash.get')

exports.intents = require('./intents')

exports.handler = function handler(state, intents) {
  return {
    state: state || '',
    intents: intents || [],
    config: {},
    addIntents: function(newIntents) {
      this.intents = this.intents.concat(newIntents)
      return this
    },
    setConfig: function(config) {
      this.config = config
      return this
    },
    create: function(config) {
      intents = this.intents.map(function(intent) {
        return intent(config)
      })
      intents = Object.assign({}, ...intents)
      var result = Alexa.CreateStateHandler(this.state, intents)
      return result
    }
  }
}

exports.skill = function(config, handlers) {
  return {
    config: config || {},
    handlers: handlers || [],
    addHandler: function(newHandler) {
      var existing = this.handlers.filter(function(h) {
        return h.state === newHandler.state
      })

      if (!existing.length) {
        this.handlers.push(newHandler)
        return this
      }

      this.handlers.map(function(h, i) {
        if (h.state === stateName) {
          this.handlers[i].addIntents(newStateHandler.intents)
        }
      })

      return this
    },
    create: function() {
      var config = this.config
      handlers = this.handlers.map(function(handler) {
        return handler.create(config)
      })

      return function(event, context, callback) {
        if (!config || !config.APP_ID) {
          throw 'APP_ID must be set on skill config object'
        }
        var alexa = Alexa.handler(event, context, callback)
        alexa.appId = config.APP_ID
        alexa.registerHandlers.apply(alexa, handlers)
        if (config.DYNAMODB_TABLE_NAME) {
          alexa.dynamoDBTableName = config.DYNAMODB_TABLE_NAME
        }
        alexa.execute()
      }
    }
  }
}
