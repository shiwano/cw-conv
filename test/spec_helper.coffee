fs = require 'fs'
{JSV} = require 'jsv'

jsv = JSV.createEnvironment()

global.p = console.log
global.window =
  btoa: (string) ->
    buffer = new Buffer string.length
    for char, index in string
      buffer[index] = char.charCodeAt 0
    buffer.toString 'base64'

exports.require = (path) =>
  require "#{__dirname}/../src/#{path}"

exports.registerSchema = (schemaName) ->
  schemaString = fs.readFileSync "test/schemas/#{schemaName}.json", 'utf-8'
  schemaData = JSON.parse schemaString
  jsv.createSchema schemaData

exports.registerSchemas = (schemaNames) ->
  for schemaName in schemaNames
    exports.registerSchema schemaName

exports.validateJSON = (data, schemaName) ->
  schema = jsv.findSchema "http://schema.cardwirth.org/#{schemaName}"
  validation = schema.validate(data)
  if validation.errors.length
    throw Error JSON.stringify(validation.errors, null, 2)
  true
