define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'
  {Event} = require './event'
  {BackgroundImage} = require './background_image'

  class Area extends Base
    parse: ->
      @type                 = @reader.readInt8()
      @reader.seek 4 # skip the unknown data
      @data.name            = @reader.readString()
      @data.id              = @reader.readInt32() % 10000
      eventsLength          = @reader.readInt32()
      @data.events          = (new Event(@).parse() for i in [0...eventsLength])
      @data.cardArrangement = @convertCardArrangementType @reader.readInt8()
      menuCardsLength       = @reader.readInt32()
      @data.menuCards       = (new MenuCard(@).parse() for i in [0...menuCardsLength])
      bgsLength             = @reader.readInt32()
      @data.backgrounds     = (new BackgroundImage(@).parse() for i in [0...bgsLength])
      @data

  class MenuCard extends Base
    parse: ->
      @reader.seek 1 # skip the unknown data
      @data.image       = @reader.readImageAsDataURI()
      @data.name        = @reader.readString()
      @reader.seek 4 # skip the unknown data
      @data.description = @reader.readString()
      eventsLength      = @reader.readInt32()
      @data.events      = (new Event(@).parse() for i in [0...eventsLength])
      @data.flag        = @reader.readString()
      @data.scale       = @reader.readInt32()
      @data.left        = @reader.readInt32()
      @data.top         = @reader.readInt32()
      imagePath         = @reader.readString()
      @data.image       = imagePath unless @data.image
      @data

  exports.Area = Area
  exports
