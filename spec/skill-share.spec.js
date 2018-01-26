var skillShare = require('./virtual-alexa')

describe('Skill Share', function() {
  it('creates a handler without blowing up', function() {
    var alexa = skillShare()
    expect(true).toEqual(true)
  })
})
