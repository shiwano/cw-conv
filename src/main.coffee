define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  reader = require './reader'
  exports
