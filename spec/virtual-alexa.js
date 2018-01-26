var va = require('virtual-alexa')
var config = require('./test-config')

module.exports = function() {
  return va.VirtualAlexa.Builder()
    .handler("./spec/test-handler.handler")
    .intentSchemaFile("./speechAssets/IntentSchema.json")
    .sampleUtterancesFile("./speechAssets/SampleUtterances.txt")
    .applicationID(config.APP_ID)
    .create()
}
