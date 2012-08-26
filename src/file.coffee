define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  utils = require './utils'

  exports.read = (filepath, done) ->
    fs = require 'fs'
    stat = fs.statSync(filepath)
    fs.open filepath, 'r', (status, fd) ->
      return console.warn(status.message) if status
      buf = new Buffer(stat.size)
      fs.read fd, buf, 0, stat.size, 0, ->
        done utils.toArrayBuffer(buf)

  exports
