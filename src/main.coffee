define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  file = require './file'
  utils = require './utils'
  exports
