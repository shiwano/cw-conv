define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  main = require './main'

  exports.read = ->
    main.awesome()

  exports
