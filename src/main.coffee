define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  exports.awesome = ->
    'awesome'

  exports
