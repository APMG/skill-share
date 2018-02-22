var AWS = require('aws-sdk')

module.exports = function(params) {
  var defaultParams = params || {}

  return {
    listObjects: function(customParams) {
      var params = Object.assign(defaultParams, customParams || {})
      return this.s3().listObjects(params).promise()
    },
    getObject: function(customParams) {
      var params = Object.assign(defaultParams, customParams || {})
      return this.s3().getObject(params).promise()
    },
    s3: function() { return new AWS.S3() }
  }
}
