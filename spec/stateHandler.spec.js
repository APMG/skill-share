var skillShare = require('../src/index')
h = skillShare.stateHandler

describe("State handler", function () {
  it('accepts a state', function() {
    handler = h('TEST_STATE')
    expect(handler.state).toEqual('TEST_STATE')
  })

  it('accepts intents', function() {
    handler = h('', [testIntent1])
    expect(handler.intents).toEqual([testIntent1])
  })

  it('accepts intents later', function() {
    handler = h('', [testIntent1])
    handler.addIntents([testIntent2])
    expect(handler.intents).toEqual([testIntent1, testIntent2])
  })

  it('can override intents', function() {
    handler = h('', [testIntent1, testIntent2, testIntent3])
    handler.addIntents([intent2Override])
    result = handler.create()
    expect(result['Intent2']()).toEqual('intent 2 override')
  })
})
var testIntent1 = function() {
  return {
    'Intent1': function(config) {
      return 'intent1'
    }
  }
}
var testIntent2 = function() {
  return {
    'Intent2': function(config) {
      return 'intent2'
    }
  }
}
var testIntent3 = function() {
  return {
    'Intent3': function(config) {
      return 'intent3'
    }
  }
}

var intent2Override = function() {
  return {
    'Intent2': function(config) {
      return 'intent 2 override'
    }
  }
}
