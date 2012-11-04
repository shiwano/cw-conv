`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define (require, exports, module) ->
  {ItemCard}  = require './item_card'
  {SkillCard} = require './skill_card'
  {BeastCard} = require './beast_card'
  {Base}      = require './base'

  class CharacterCard extends Base
    parse: ->
      @data.type         = @convertScenarioDataType @readInt8()
      @data.image        = @readImageAsDataURI()
      @data.name         = @readString()
      @data.id           = @readInt32() % 10000

      @data.physicsproof = @readBoolean()
      @data.magicproof   = @readBoolean()
      @data.bodyproof    = @readBoolean()
      @data.mindproof    = @readBoolean()
      @data.holyproof    = @readBoolean()
      @data.spellproof   = @readBoolean()
      @data.fireproof    = @readBoolean()
      @data.iceproof     = @readBoolean()
      @data.fireWeakness = @readBoolean()
      @data.iceWeakness  = @readBoolean()

      @data.level            = @readInt32()
      @data.money            = @readInt32()
      @data.description      = @readString()
      @data.life             = @readInt32()
      @data.maxLife          = @readInt32()
      @data.paralysisCounter = @readInt32()
      @data.poisonCounter    = @readInt32()

      @data.evasion    = @readInt32()
      @data.resistance = @readInt32()
      @data.defense    = @readInt32()

      @data.dex = @readInt32()
      @data.agl = @readInt32()
      @data.int = @readInt32()
      @data.str = @readInt32()
      @data.vit = @readInt32()
      @data.min = @readInt32()

      @data.aggressiveness = @readInt32()
      @data.cheerfulness   = @readInt32()
      @data.braveness      = @readInt32()
      @data.carefulness    = @readInt32()
      @data.craftiness     = @readInt32()

      @data.mentality         = @convertCharacterMentalityType @readInt8()
      @data.mentalityCounter  = @readInt32()
      @data.bindCounter       = @readInt32()
      @data.silenceCounter    = @readInt32()
      @data.revealCounter     = @readInt32()
      @data.magicproofCounter = @readInt32()

      @data.actionLevelBonus        = @readInt32()
      @data.actionLevelBonusCounter = @readInt32()
      @data.evasionBonus            = @readInt32()
      @data.evasionBonusCounter     = @readInt32()
      @data.resistanceBonus         = @readInt32()
      @data.resistanceBonusCounter  = @readInt32()
      @data.defenseBonus            = @readInt32()
      @data.defenseBonusCounter     = @readInt32()

      @data.itemCards    = @readArray => new ItemCard(@).parse()
      @data.skillCards   = @readArray => new SkillCard(@).parse()
      @data.beastCards   = @readArray => new BeastCard(@).parse()
      @data.achievements = @readArray => new Achievement(@).parse()
      @data

  class Achievement extends Base
    parse: ->
      @data.name  = @readString()
      @data.score = @readInt32()
      @data

  exports.CharacterCard = CharacterCard
  exports
