define = @define or require('amdefine')(module)

define (require, exports, module) ->
  {Base} = require './base'

  class Summary extends Base
    parse: ->
      @data.type        = @convertScenarioDataType 8
      @data.image        = @readImageAsDataURI()
      @data.title        = @readString()
      @data.description  = @readString()
      @data.author       = @readString()
      @data.prerequisite = new Prerequisite(@).parse()
      sceneId            = @readInt32()
      @version           = ~~(sceneId / 10000)
      @data.startSceneId = sceneId % 10000
      @data.defnitions   = new Defnitions(@).parse()
      @seek 4 # skip a unknown data
      @data.recommendedLevel =
        min: @readInt32()
        max: @readInt32()
      @data

  class Prerequisite extends Base
    parse: ->
      achievements             = @readString()
      @data.achievements       = if achievements then achievements.split('\n') else []
      @data.achievementsNumber = @readInt32()
      @data

  class Defnitions extends Base
    parse: ->
      @data.stepsList = @readArray => new Steps(@).parse()
      @data.flags     = @readArray => new Flag(@).parse()
      @data

  class Flag extends Base
    parse: ->
      @data.name             = @readString()
      @data.default          = @readBoolean()
      @data.valueNameOnTrue  = @readString()
      @data.valueNameOnFalse = @readString()
      @data

  class Steps extends Base
    parse: ->
      @data.name         = @readString()
      @data.default      = @readInt32()
      @data.valueNames   = (@readString() for i in [0..9])
      @data

  exports.Summary = Summary
  exports
