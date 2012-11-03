define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Effect} = require './effect'
  {SimpleEvent} = require './event'
  {Base} = require './base'

  class Card extends Base
    parse: ->
      @data.type             = @convertScenarioDataType @readInt8()
      @data.image            = @readImageAsDataURI()
      @data.name             = @readString()
      @data.id               = @readInt32() % 10000
      @data.description      = @readString()
      @data.physicalAptitude = @convertPhysicalAptitudeType @readInt32()
      @data.mentalAptitude   = @convertMentalAptitudeType @readInt32()
      @data.ignoreSilence    = not @readBoolean()
      @data.targetAll        = @readBoolean()
      @data.target           = @convertCardTargetType @readInt8()
      @data.phenomenonType   = @convertEffectPhenomenonType @readInt8()
      @data.reactionType     = @convertEffectReactionType @readInt8()
      @data.successRate      = @readInt32()
      @data.animationType    = @convertEffectAnimationType @readInt8()
      effectsLength          = @readInt32()
      @data.effects          = (new Effect(@).parse() for i in [0...effectsLength])
      @data.evasionBonus     = @readInt32()
      @data.resistanceBonus  = @readInt32()
      @data.defenseBonus     = @readInt32()
      @data.soundBefore      = @readString()
      @data.soundAfter       = @readString()
      @data.keycodes         = (@readString() for i in [0..4])
      @data.keycodes         = (keycode for keycode in @data.keycodes when keycode)
      @data.rarity           = @convertCardRarityType @readInt8()
      @data.scenario         = @readString()
      @data.author           = @readString()
      eventsLength           = @readInt32()
      @data.events           = (new SimpleEvent(@).parse() for i in [0...eventsLength])
      @data.reserved         = @readBoolean()
      @seek 4 if @isInnData
      @data

  exports.Card = Card
  exports
