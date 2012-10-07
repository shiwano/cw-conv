define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Effect} = require './effect'
  {SimpleEvent} = require './event'
  {Base} = require './base'

  class Card extends Base
    parse: ->
      @data.type             = @convertScenarioDataType @reader.readInt8()
      @data.image            = @reader.readImageAsDataURI()
      @data.name             = @reader.readString()
      @data.id               = @reader.readInt32() % 10000
      @data.description      = @reader.readString()
      @data.physicalAptitude = @convertPhysicalAptitudeType @reader.readInt32()
      @data.mentalAptitude   = @convertMentalAptitudeType @reader.readInt32()
      @data.ignoreSilence    = not @reader.readBoolean()
      @data.targetAll        = @reader.readBoolean()
      @data.target           = @convertCardTargetType @reader.readInt8()
      @data.phenomenonType   = @convertEffectPhenomenonType @reader.readInt8()
      @data.reactionType     = @convertEffectReactionType @reader.readInt8()
      @data.successRate      = @reader.readInt32()
      @data.animationType    = @convertEffectAnimationType @reader.readInt8()
      effectsLength          = @reader.readInt32()
      @data.effects          = (new Effect(@).parse() for i in [0...effectsLength])
      @data.evasionBonus     = @reader.readInt32()
      @data.resistanceBonus  = @reader.readInt32()
      @data.defenseBonus     = @reader.readInt32()
      @data.soundBefore      = @reader.readString()
      @data.soundAfter       = @reader.readString()
      @data.keycodes         = (@reader.readString() for i in [0..4])
      @data.keycodes         = (keycode for keycode in @data.keycodes when keycode)
      @data.rarity           = @convertCardRarityType @reader.readInt8()
      @data.scenario         = @reader.readString()
      @data.author           = @reader.readString()
      eventsLength           = @reader.readInt32()
      @data.events           = (new SimpleEvent(@).parse() for i in [0...eventsLength])
      @data.reserved         = @reader.readBoolean()
      @reader.seek 4 if @isInnData
      @data

  exports.Card = Card
  exports
