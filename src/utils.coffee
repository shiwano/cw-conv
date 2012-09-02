define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  exports.toBase64 = (buffer) ->
    string = String.fromCharCode.apply null, new Uint8Array(buffer)
    fs = require 'fs'
    window.btoa string
  exports
