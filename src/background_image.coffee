define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'

  class BackgroundImage extends Base
    parse: ->
      @data.left   = @reader.readInt32()
      @data.top    = @reader.readInt32()
      @data.width  = @reader.readInt32() % 10000
      @data.height = @reader.readInt32()
      @data.image  = @reader.readString()
      @data.mask   = @reader.readBoolean()
      @data.flag   = @reader.readString()
      @reader.seek 1 # skip
      @data

  exports.BackgroundImage = BackgroundImage
  exports

