define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'
  {Event} = require './event'

  class Battle extends Base
    parse: ->
      @data.type        = @convertScenarioDataType @readInt8()
      @seek 4 # skip the unknown data
      @data.name            = @readString()
      @data.id              = @readInt32() % 10000
      eventsLength          = @readInt32()
      @data.events          = (new Event(@).parse() for i in [0...eventsLength])
      @data.cardArrangement = @convertCardArrangementType @readInt8()
      enemyCardsLength      = @readInt32()
      @data.enemyCards      = (new EnemyCard(@).parse() for i in [0...enemyCardsLength])
      @data.music           = @readString()
      @data

  class EnemyCard extends Base
    parse: ->
      @data.characterId = @readInt32()
      eventsLength      = @readInt32()
      @data.events      = (new Event(@).parse() for i in [0...eventsLength])
      @data.flag        = @readString()
      @data.scale       = @readInt32()
      @data.left        = @readInt32()
      @data.top         = @readInt32()
      @data.escapable   = @readBoolean()
      @data

  exports.Battle = Battle
  exports
