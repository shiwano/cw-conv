define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'

  class BackgroundImage extends Base
    parse: ->
      @data.left   = @readInt32()
      @data.top    = @readInt32()
      @data.width  = @readInt32() % 10000
      @data.height = @readInt32()
      @data.image  = @readString()
      @data.mask   = @readBoolean()
      @data.flag   = @readString()
      @seek 1 # skip
      @data

  exports.BackgroundImage = BackgroundImage
  exports

