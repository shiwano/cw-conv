define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {ItemCard} = require './item_card'
  {SkillCard} = require './skill_card'
  {BeastCard} = require './beast_card'
  {Base} = require './base'

  class CharacterCard extends Base
    parse: ->
      @data.type         = @convertScenarioDataType @reader.readInt8()
      @data.image        = @reader.readImageAsDataURI()
      @data.name         = @reader.readString()
      @data.id           = @reader.readInt32() % 10000

      @data.physicsproof = @reader.readBoolean()
      @data.magicproof   = @reader.readBoolean()
      @data.bodyproof    = @reader.readBoolean()
      @data.mindproof    = @reader.readBoolean()
      @data.holyproof    = @reader.readBoolean()
      @data.spellproof   = @reader.readBoolean()
      @data.fireproof    = @reader.readBoolean()
      @data.iceproof     = @reader.readBoolean()
      @data.fireWeakness = @reader.readBoolean()
      @data.iceWeakness  = @reader.readBoolean()

      @data.level = @reader.readInt32()
      @data.money = @reader.readInt32()
      @data.description = @reader.readString()
      @data.life = @reader.readInt32()
      @data.maxLife = @reader.readInt32()
      @data.paralysisCounter = @reader.readInt32()
      @data.poisonCounter = @reader.readInt32()

      @data.evasion = @reader.readInt32()
      @data.resistance = @reader.readInt32()
      @data.defense = @reader.readInt32()

      @data.dex = @reader.readInt32()
      @data.agl = @reader.readInt32()
      @data.int = @reader.readInt32()
      @data.str = @reader.readInt32()
      @data.vit = @reader.readInt32()
      @data.min = @reader.readInt32()

      @data.aggressiveness = @reader.readInt32()
      @data.cheerfulness = @reader.readInt32()
      @data.braveness = @reader.readInt32()
      @data.carefulness = @reader.readInt32()
      @data.craftiness = @reader.readInt32()

      @data.mentality = @convertCharacterMentalityType @reader.readInt8()
      @data.mentalityCounter = @reader.readInt32()
      @data.bindCounter = @reader.readInt32()
      @data.silenceCounter = @reader.readInt32()
      @data.revealCounter = @reader.readInt32()
      @data.magicproofCounter = @reader.readInt32()

      @data.actionLevelBonus        = @reader.readInt32()
      @data.actionLevelBonusCounter = @reader.readInt32()
      @data.evasionBonus            = @reader.readInt32()
      @data.evasionBonusCounter     = @reader.readInt32()
      @data.resistanceBonus         = @reader.readInt32()
      @data.resistanceBonusCounter  = @reader.readInt32()
      @data.defenseBonus            = @reader.readInt32()
      @data.defenseBonusCounter     = @reader.readInt32()

      itemLength = @reader.readInt32()
      @data.itemCards = (new ItemCard(@).parse() for i in [0...itemLength])
      skillLength = @reader.readInt32()
      @data.skillCards = (new SkillCard(@).parse() for i in [0...skillLength])
      beastLength = @reader.readInt32()
      @data.beastCards = (new BeastCard(@).parse() for i in [0...beastLength])

      achievementLength = @reader.readInt32()
      @data.achievements = (new Achievement(@).parse() for i in [0...achievementLength])
      @data

  class Achievement extends Base
    parse: ->
      @data.name  = @reader.readString()
      @data.score = @reader.readInt32()
      @data

  exports.CharacterCard = CharacterCard
  exports
