global.p = console.log
global.window = {}

global.window.btoa = (string) ->
  buffer = new Buffer string.length
  for char, index in string
    buffer[index] = char.charCodeAt 0
  buffer.toString 'base64'

module.exports.require = (path) =>
  require "#{__dirname}/../src/#{path}"
