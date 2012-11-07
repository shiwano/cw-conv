define = @define or require('amdefine')(module)

define (require, exports, module) ->
  {Base} = require './base'
  {Event} = require './event'

  class Battle extends Base
    parse: ->
      @data.type        = @convertScenarioDataType @readInt8()
      @seek 4 # skip the unknown data
      @data.name            = @readString()
      @data.id              = @readInt32() % 10000
      @data.events          = @readArray => new Event(@).parse()
      @data.cardArrangement = @convertCardArrangementType @readInt8()
      @data.enemyCards      = @readArray => new EnemyCard(@).parse()
      @data.music           = @readString()
      @data

  class EnemyCard extends Base
    parse: ->
      @data.characterId = @readInt32()
      @data.events      = @readArray => new Event(@).parse()
      @data.flag        = @readString()
      @data.scale       = @readInt32()
      @data.left        = @readInt32()
      @data.top         = @readInt32()
      @data.escapable   = @readBoolean()
      @data

  exports.Battle = Battle
  exports
