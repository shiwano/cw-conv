fs = require 'fs'
{JSV} = require 'jsv'

global.p = console.log
global.window =
  btoa: (string) ->
    buffer = new Buffer string.length
    for char, index in string
      buffer[index] = char.charCodeAt 0
    buffer.toString 'base64'

module.exports.require = (path) =>
  require "#{__dirname}/../src/#{path}"

module.exports.validateJSON = (data, schemaName) ->
  schema = fs.readFileSync "test/schemas/#{schemaName}.json", 'utf-8'
  schema = JSON.parse schema
  validation = JSV.createEnvironment().validate(data, schema)

  if validation.errors.length
    throw Error(JSON.stringify validation.errors)
