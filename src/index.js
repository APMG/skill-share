var Alexa = require('alexa-sdk')
var get = require('lodash.get')
var isFunction = require('lodash.isfunction')
var defaultConfig = require('./default-config')

exports.intents = require('./intents')
exports.user = require('./user')
exports.directives = require('./directives')
exports.s3Factory = require('./s3Factory')

exports.stateHandler = function handler(state, intents) {
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
      intents = this.intents.map(function(intent, i) {
        if (!isFunction(intent)) {
          console.log('ERROR', 'Expected intent at index ' + i + ' to be a function in "' + this.state + '" state handler. Got:', intent)
          throw 'Expected intent at index ' + i + ' to be a function in "' + this.state + '" state handler. See logs for details'
        }
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
    config: Object.assign(defaultConfig, config || {}),
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
          this.handlers[i].addIntents(newHandler.intents)
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
