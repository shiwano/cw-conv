define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'

  class Summary extends Base
    parse: ->
      @data.type        = @convertScenarioDataType 8
      @data.image        = @reader.readImageAsDataURI()
      @data.title        = @reader.readString()
      @data.description  = @reader.readString()
      @data.author       = @reader.readString()
      @data.prerequisite = new Prerequisite(@).parse()
      sceneId            = @reader.readInt32()
      @version           = ~~(sceneId / 10000)
      @data.startSceneId = sceneId % 10000
      @data.defnitions   = new Defnitions(@).parse()

      @reader.seek 4 # skip a unknown data

      @data.recommendedLevel =
        min: @reader.readInt32()
        max: @reader.readInt32()

      @data

  class Prerequisite extends Base
    parse: ->
      coupons             = @reader.readString()
      @data.coupons       = if coupons then coupons.split('\n') else []
      @data.couponsNumber = @reader.readInt32()
      @data

  class Defnitions extends Base
    parse: ->
      stepsListLength = @reader.readInt32()
      @data.stepsList = (new Steps(@).parse() for i in [0...stepsListLength])
      flagsLength     = @reader.readInt32()
      @data.flags     = (new Flag(@).parse() for i in [0...flagsLength])
      @data

  class Flag extends Base
    parse: ->
      @data.name             = @reader.readString()
      @data.default          = @reader.readBoolean()
      @data.valueNameOnTrue  = @reader.readString()
      @data.valueNameOnFalse = @reader.readString()
      @data

  class Steps extends Base
    parse: ->
      @data.name         = @reader.readString()
      @data.default      = @reader.readInt32()
      @data.valueNames   = (@reader.readString() for i in [0..9])
      @data

  exports.Summary = Summary
  exports
