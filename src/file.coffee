define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  fs = require 'fs'
  buffer = require 'buffer'
  utils = require './utils'

  exports.read = (filepath, done) ->
    stat = fs.statSync(filepath)
    fs.open filepath, 'r', (status, fd) ->
      return console.warn(status.message) if status
      buf = new Buffer(stat.size)
      fs.read fd, buf, 0, stat.size, 0, ->
        done utils.toArrayBuffer(buf)

  exports
