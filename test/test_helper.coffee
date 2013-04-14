fs = require 'fs'
path = require 'path'
{JSV} = require 'jsv'

jsv = JSV.createEnvironment()

global.p = console.log
global.btoa = (string) ->
  buffer = new Buffer string.length
  for char, index in string
    buffer[index] = char.charCodeAt 0
  buffer.toString 'base64'

exports.require = (path) =>
  require "#{__dirname}/../src/#{path}"

exports.readFixture = (name, encoding) ->
  fs.readFileSync path.join('test/fixtures', name), encoding

exports.readFixtureAsArrayBuffer = (name, encoding) ->
  buffer = exports.readFixture name, encoding
  exports.toArrayBuffer buffer

exports.toArrayBuffer = (buffer) ->
  arrayBuffer = new ArrayBuffer(buffer.length)
  view = new Uint8Array(arrayBuffer)
  for value, index in buffer
    view[index] = value
  arrayBuffer

exports.toBuffer = (arrayBuffer) ->
  view = new Uint8Array(arrayBuffer)
  buffer = new Buffer(view.length)
  for value, index in view
    buffer[index] = value
  buffer

exports.findEventElements = (eventName, event, results=[]) ->
  for elem in event.children
    results.push elem if elem.type is eventName
    exports.findEventElements eventName, elem, results
  results

findSchema = (schemaName) ->
  jsv.findSchema "http://schema.cardwirth.org/#{schemaName}"

exports.registerSchema = ->
  for schemaName in arguments
    schema = findSchema schemaName
    continue if schema?
    schemaString = fs.readFileSync "schemas/lib/#{schemaName}.json", 'utf-8'
    schemaData = JSON.parse schemaString
    jsv.createSchema schemaData

exports.registerSchema 'beast_card'

exports.validateJSON = (data, schemaName) ->
  schema = findSchema schemaName
  validation = schema.validate(data)
  if validation.errors.length
    throw Error JSON.stringify(validation.errors, null, 2)
  true
