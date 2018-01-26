exports.arrayToSentence = function (arr) {
  if (arr.length === 1) {
    return arr[0]
  }
  let last = arr.pop()
  return arr.join(', ') + ' and ' + last
}

exports.replacePhonemes = function (string, phonemeDictionary) {
  for (var phoneme in phonemeDictionary) {
    if (string.indexOf(phoneme) !== -1) {
      string = string.replace(
        phoneme,
        "<phoneme alphabet='ipa' " +
          "ph='" + phonemeDictionary[phoneme] + "'>" +
          phoneme +
        '</phoneme>'
      )
    }
  }
  return string
}
