define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  utils = require './utils'
  {Base} = require './base'
  {BackgroundImage} = require './background_image'
  EventElement = {}

  class EventElementBase extends Base
    parse: ->
      @data.type     = @convertEventElementType @readInt8()
      @data.label    = @readString()
      @data.children = @readArray (=> createEventElement(@).parse()), @readInt32() % 10000
      @seek 4 if @isInnData
      @data

  class EventElement.Start extends EventElementBase

  class EventElement.StartLink extends EventElementBase
    parse: ->
      super
      @data.startLabel = @readString()
      @data

  class EventElement.Battle extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.ScenarioEnd extends EventElementBase
    parse: ->
      super
      @data.completed = @readBoolean()
      @data

  class EventElement.GameOver extends EventElementBase

  class EventElement.Scene extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.Message extends EventElementBase
    parse: ->
      super
      @data.image = @readString()
      @data.message = @readString()
      @data

  class EventElement.Music extends EventElementBase
    parse: ->
      super
      @data.music = @readString()
      @data

  class EventElement.Background extends EventElementBase
    parse: ->
      super
      @data.backgrounds = @readArray => new BackgroundImage(@).parse()
      @data

  class EventElement.Sound extends EventElementBase
    parse: ->
      super
      @data.sound = @readString()
      @data

  class EventElement.Wait extends EventElementBase
    parse: ->
      super
      @data.duration = @readInt32()
      @data

  class EventElement.Effect extends EventElementBase
    parse: ->
      {Effect}       = require './effect' # lazy require
      @data.type     = @convertEventElementType @readInt8()
      @data.label    = @readString()
      @data.children = @readArray (=> createEventElement(@).parse()), @readInt32() % 10000
      @seek 4 if @isInnData
      @data.level          = @readInt32()
      @data.target         = @convertTargetType @readInt8(), true
      @data.phenomenonType = @convertEffectPhenomenonType @readInt8()
      @data.reactionType   = @convertEffectReactionType @readInt8()
      @data.successRate    = @readInt32()
      @data.sound          = @readString()
      @data.animationType  = @convertEffectAnimationType @readInt8()
      @data.effects        = @readArray => new Effect(@).parse()
      @data

  class EventElement.BranchByMemberSelect extends EventElementBase
    parse: ->
      super
      @data.targetAll = @readBoolean()
      @data.random = @readBoolean()
      @data

  class EventElement.BranchByAbility extends EventElementBase
    parse: ->
      super
      @data.value = @readInt32()
      @data.target = @convertTargetType @readInt8()
      @data.physicalAptitude = @convertPhysicalAptitudeType @readInt32()
      @data.mentalAptitude = @convertMentalAptitudeType @readInt32()
      @data

  class EventElement.BranchByRandom extends EventElementBase
    parse: ->
      super
      @data.probability= @readInt32()
      @data

  class EventElement.BranchByFlag extends EventElementBase
    parse: ->
      super
      @data.flagName = @readString()
      @data

  class EventElement.Flag extends EventElementBase
    parse: ->
      super
      @data.flagName = @readString()
      @data.flag = @readBoolean()
      @data

  class EventElement.BranchBySteps extends EventElementBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data

  class EventElement.Steps extends EventElementBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data.step = @readInt32()
      @data

  class EventElement.BranchByFriend extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.BranchByItem extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.BranchBySkill extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.BranchByInformation extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.BranchByBeast extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.BranchByMoney extends EventElementBase
    parse: ->
      super
      @data.money = @readInt32()
      @data

  class EventElement.BranchByAchievement extends EventElementBase
    parse: ->
      super
      @data.achievement = @readString()
      @seek 4 # skip the unknown data
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.Friend extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.Item extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.Skill extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.Information extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.Beast extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.Money extends EventElementBase
    parse: ->
      super
      @data.money = @readInt32()
      @data

  class EventElement.Achievement extends EventElementBase
    parse: ->
      super
      @data.achievement = @readString()
      @data.achievementScore = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.FriendLoss extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.ItemLoss extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.SkillLoss extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.InformationLoss extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.BeastLoss extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.MoneyLoss extends EventElementBase
    parse: ->
      super
      @data.money = @readInt32()
      @data

  class EventElement.AchievementLoss extends EventElementBase
    parse: ->
      super
      @data.achievement = @readString()
      @seek 4 # skip the unknown data
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventElement.CharacterMessage extends EventElementBase
    parse: ->
      super
      @data.target = @convertTargetType @readInt8()
      @data.messages = @readArray => @readMessage()
      @data

    readMessage: ->
      achievements = @readString()
      return {
        achievements: if achievements then achievements.split('\n') else []
        message: @readString()
      }

  class EventElement.StepUp extends EventElementBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data

  class EventElement.StepDown extends EventElementBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data

  class EventElement.FlagReverse extends EventElementBase
    parse: ->
      super
      @data.flagName = @readString()
      @data

  class EventElement.BranchByCurrentStep extends EventElementBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data.step = @readInt32()
      @data

  class EventElement.TimePassage extends EventElementBase

  class EventElement.BranchByLevel extends EventElementBase
    parse: ->
      super
      @data.useAverage = @readBoolean()
      @data.level = @readInt32()
      @data

  class EventElement.BranchByCharacterState extends EventElementBase
    parse: ->
      super
      @data.characterState = @convertCharacterStateType @readInt8()
      @data.target = @convertTargetType @readInt8()
      @data

  class EventElement.BranchByPartyNumber extends EventElementBase
    parse: ->
      super
      @data.number = @readInt32()
      @data

  class EventElement.PartyShow extends EventElementBase

  class EventElement.PartyHide extends EventElementBase

  class EventElement.EffectBreak extends EventElementBase

  class EventElement.StartCall extends EventElementBase
    parse: ->
      super
      @data.startLabel = @readString()
      @data

  class EventElement.PackageLink extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.PackageCall extends EventElementBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventElement.BranchByScene extends EventElementBase

  class EventElement.BranchByBattle extends EventElementBase

  class EventElement.BranchByCompletedStamp extends EventElementBase
    parse: ->
      super
      @data.completedStamp = @readString()
      @data

  class EventElement.CompletedStamp extends EventElementBase
    parse: ->
      super
      @data.completedStamp = @readString()
      @data

  class EventElement.CompletedStampLoss extends EventElementBase
    parse: ->
      super
      @data.completedStamp = @readString()
      @data

  class EventElement.BranchByGossip extends EventElementBase
    parse: ->
      super
      @data.gossip = @readString()
      @data

  class EventElement.Gossip extends EventElementBase
    parse: ->
      super
      @data.gossip = @readString()
      @data

  class EventElement.GossipLoss extends EventElementBase
    parse: ->
      super
      @data.gossip = @readString()
      @data

  class EventElement.BranchByBattleNow extends EventElementBase

  class EventElement.BackgroundRebuild extends EventElementBase

  class EventElement.FlagCheck extends EventElementBase
    parse: ->
      super
      @data.flagName = @readString()
      @data

  createEventElement = (parent) ->
    type = parent.convertEventElementType parent.reader.readInt8()
    parent.reader.seek -1
    upperCamelCasedType = utils.toUpperCamelCase type
    element = new EventElement[upperCamelCasedType](parent)
    element

  exports.createEventElement = createEventElement
  exports
