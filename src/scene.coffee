define = @define or require('amdefine')(module)

define (require, exports, module) ->
  {Base} = require './base'
  {Event} = require './event'
  {BackgroundImage} = require './background_image'

  class Scene extends Base
    parse: ->
      @data.type        = @convertScenarioDataType @readInt8()
      @seek 4 # skip the unknown data
      @data.name            = @readString()
      @data.id              = @readInt32() % 10000
      @data.events          = @readArray => new Event(@).parse()
      @data.cardArrangement = @convertCardArrangementType @readInt8()
      @data.menuCards       = @readArray => new MenuCard(@).parse()
      @data.backgrounds     = @readArray => new BackgroundImage(@).parse()
      @data

  class MenuCard extends Base
    parse: ->
      @seek 1 # skip the unknown data
      @data.image       = @readImageAsDataURI()
      @data.name        = @readString()
      @seek 4 # skip the unknown data
      @data.description = @readString()
      @data.events      = @readArray => new Event(@).parse()
      @data.flagName    = @readString()
      @data.scale       = @readInt32()
      @data.left        = @readInt32()
      @data.top         = @readInt32()
      imagePath         = @readString()
      @data.image       = imagePath unless @data.image
      @data

  exports.Scene = Scene
  exports
