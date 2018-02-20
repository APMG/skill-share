exports.addPlayDirective = function (context, streamUrl, behavior, trackNumber, next, begin) {
  // Defaults configured here are ideal for a streaming response
  // For more options see https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
  context.response.audioPlayerPlay(
    behavior || 'REPLACE_ALL',
    streamUrl,
    trackNumber || '1',
    next || null,
    begin || 0
  )
}

exports.stop = function (context) {
  context.response.audioPlayerClearQueue('CLEAR_ALL')
  context.emit(':responseReady')
}

exports.say = function (context, message) {
  context.response.speak(message)
  context.emit(':responseReady', message)
}
