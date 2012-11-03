define = require('amdefine')(module) if typeof window.define isnt 'function'

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
      eventsLength          = @readInt32()
      @data.events          = (new Event(@).parse() for i in [0...eventsLength])
      @data.cardArrangement = @convertCardArrangementType @readInt8()
      menuCardsLength       = @readInt32()
      @data.menuCards       = (new MenuCard(@).parse() for i in [0...menuCardsLength])
      bgsLength             = @readInt32()
      @data.backgrounds     = (new BackgroundImage(@).parse() for i in [0...bgsLength])
      @data

  class MenuCard extends Base
    parse: ->
      @seek 1 # skip the unknown data
      @data.image       = @readImageAsDataURI()
      @data.name        = @readString()
      @seek 4 # skip the unknown data
      @data.description = @readString()
      eventsLength      = @readInt32()
      @data.events      = (new Event(@).parse() for i in [0...eventsLength])
      @data.flag        = @readString()
      @data.scale       = @readInt32()
      @data.left        = @readInt32()
      @data.top         = @readInt32()
      imagePath         = @readString()
      @data.image       = imagePath unless @data.image
      @data

  exports.Scene = Scene
  exports
