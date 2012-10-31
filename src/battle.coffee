define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'
  {Event} = require './event'

  class Battle extends Base
    parse: ->
      @data.type        = @convertScenarioDataType @reader.readInt8()
      @reader.seek 4 # skip the unknown data
      @data.name            = @reader.readString()
      @data.id              = @reader.readInt32() % 10000
      eventsLength          = @reader.readInt32()
      @data.events          = (new Event(@).parse() for i in [0...eventsLength])
      @data.cardArrangement = @convertCardArrangementType @reader.readInt8()
      enemyCardsLength      = @reader.readInt32()
      @data.enemyCards      = (new EnemyCard(@).parse() for i in [0...enemyCardsLength])
      @data.music           = @reader.readString()
      @data

  class EnemyCard extends Base
    parse: ->
      @data.characterId = @reader.readInt32()
      eventsLength      = @reader.readInt32()
      @data.events      = (new Event(@).parse() for i in [0...eventsLength])
      @data.flag        = @reader.readString()
      @data.scale       = @reader.readInt32()
      @data.left        = @reader.readInt32()
      @data.top         = @reader.readInt32()
      @data.escapable   = @reader.readBoolean()
      @data

  exports.Battle = Battle
  exports
