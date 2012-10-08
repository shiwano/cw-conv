fs = require 'fs'
path = require 'path'
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

exports.readFixtureFile = (name, encoding) ->
  fs.readFileSync path.join('test/fixtures', name), encoding

exports.findEventElements = (eventName, event, results=[]) ->
  for elem in event.children
    results.push elem if elem.type is eventName
    exports.findEventElements eventName, elem, results
  results

exports.registerSchema = ->
  for schemaName in [arguments...]
    schemaString = fs.readFileSync "test/schemas/#{schemaName}.json", 'utf-8'
    schemaData = JSON.parse schemaString
    jsv.createSchema schemaData

exports.validateJSON = (data, schemaName) ->
  schema = jsv.findSchema "http://schema.cardwirth.org/#{schemaName}"
  validation = schema.validate(data)
  if validation.errors.length
    throw Error JSON.stringify(validation.errors, null, 2)
  true
