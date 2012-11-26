{Base} = require './base'

class BackgroundImage extends Base
  parse: ->
    @data.left     = @readInt32()
    @data.top      = @readInt32()
    @data.width    = @readInt32() % 10000
    @data.height   = @readInt32()
    @data.image    = @readString()
    @data.mask     = @readBoolean()
    @data.flagName = @readString()
    @seek 1 # skip
    @data

exports.BackgroundImage = BackgroundImage
