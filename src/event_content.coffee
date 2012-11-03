define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  utils = require './utils'
  {Base} = require './base'
  {BackgroundImage} = require './background_image'
  EventContent = {}

  class EventContentBase extends Base
    parse: ->
      @data.type     = @convertEventContentType @readInt8()
      @data.label    = @readString()
      length         = @readInt32() % 10000
      @data.children = (createEventContent(@).parse() for i in [0...length])
      @seek 4 if @isInnData
      @data

  class EventContent.Start extends EventContentBase

  class EventContent.StartLink extends EventContentBase
    parse: ->
      super
      @data.startLabel = @readString()
      @data

  class EventContent.Battle extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.ScenarioEnd extends EventContentBase
    parse: ->
      super
      @data.completed = @readBoolean()
      @data

  class EventContent.GameOver extends EventContentBase

  class EventContent.Scene extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.Message extends EventContentBase
    parse: ->
      super
      @data.image = @readString()
      @data.message = @readString()
      @data

  class EventContent.Music extends EventContentBase
    parse: ->
      super
      @data.music = @readString()
      @data

  class EventContent.Background extends EventContentBase
    parse: ->
      super
      length = @readInt32()
      @data.backgrounds = (new BackgroundImage(@).parse() for i in [0...length])
      @data

  class EventContent.Sound extends EventContentBase
    parse: ->
      super
      @data.sound = @readString()
      @data

  class EventContent.Wait extends EventContentBase
    parse: ->
      super
      @data.duration = @readInt32()
      @data

  class EventContent.Effect extends EventContentBase
    parse: ->
      {Effect}       = require './effect'
      @data.type     = @convertEventContentType @readInt8()
      @data.label    = @readString()
      length         = @readInt32() % 10000
      @data.children = (createEventContent(@).parse() for i in [0...length])
      @seek 4 if @isInnData
      @data.level          = @readInt32()
      @data.target         = @convertTargetType @readInt8(), true
      @data.phenomenonType = @convertEffectPhenomenonType @readInt8()
      @data.reactionType   = @convertEffectReactionType @readInt8()
      @data.successRate    = @readInt32()
      @data.sound          = @readString()
      @data.animationType  = @convertEffectAnimationType @readInt8()
      length               = @readInt32()
      @data.effects        = (new Effect(@).parse() for i in [0...length])
      @data

  class EventContent.BranchByMemberSelect extends EventContentBase
    parse: ->
      super
      @data.targetAll = @readBoolean()
      @data.random = @readBoolean()
      @data

  class EventContent.BranchByAbility extends EventContentBase
    parse: ->
      super
      @data.value = @readInt32()
      @data.target = @convertTargetType @readInt8()
      @data.physicalAptitude = @convertPhysicalAptitudeType @readInt32()
      @data.mentalAptitude = @convertMentalAptitudeType @readInt32()
      @data

  class EventContent.BranchByRandom extends EventContentBase
    parse: ->
      super
      @data.probability= @readInt32()
      @data

  class EventContent.BranchByFlag extends EventContentBase
    parse: ->
      super
      @data.flagName = @readString()
      @data

  class EventContent.Flag extends EventContentBase
    parse: ->
      super
      @data.flagName = @readString()
      @data.flag = @readBoolean()
      @data

  class EventContent.BranchBySteps extends EventContentBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data

  class EventContent.Steps extends EventContentBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data.step = @readInt32()
      @data

  class EventContent.BranchByFriend extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.BranchByItem extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.BranchBySkill extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.BranchByInformation extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.BranchByBeast extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.BranchByMoney extends EventContentBase
    parse: ->
      super
      @data.money = @readInt32()
      @data

  class EventContent.BranchByAchievement extends EventContentBase
    parse: ->
      super
      @data.achievement = @readString()
      @seek 4 # skip the unknown data
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.Friend extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.Item extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.Skill extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.Information extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.Beast extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.Money extends EventContentBase
    parse: ->
      super
      @data.money = @readInt32()
      @data

  class EventContent.Achievement extends EventContentBase
    parse: ->
      super
      @data.achievement = @readString()
      @data.achievementScore = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.FriendLoss extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.ItemLoss extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.SkillLoss extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.InformationLoss extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.BeastLoss extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data.number = @readInt32()
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.MoneyLoss extends EventContentBase
    parse: ->
      super
      @data.money = @readInt32()
      @data

  class EventContent.AchievementLoss extends EventContentBase
    parse: ->
      super
      @data.achievement = @readString()
      @seek 4 # skip the unknown data
      @data.targetScope = @convertTargetScopeType @readInt8()
      @data

  class EventContent.CharacterMessage extends EventContentBase
    parse: ->
      super
      @data.target = @convertTargetType @readInt8()
      length = @readInt32()
      @data.messages = (@readMessage() for i in [0...length])
      @data

    readMessage: ->
      achievements = @readString()
      return {
        achievements: if achievements then achievements.split('\n') else []
        message: @readString()
      }

  class EventContent.StepUp extends EventContentBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data

  class EventContent.StepDown extends EventContentBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data

  class EventContent.FlagReverse extends EventContentBase
    parse: ->
      super
      @data.flagName = @readString()
      @data

  class EventContent.BranchByCurrentStep extends EventContentBase
    parse: ->
      super
      @data.stepsName = @readString()
      @data.step = @readInt32()
      @data

  class EventContent.TimePassage extends EventContentBase

  class EventContent.BranchByLevel extends EventContentBase
    parse: ->
      super
      @data.useAverage = @readBoolean()
      @data.level = @readInt32()
      @data

  class EventContent.BranchByCharacterState extends EventContentBase
    parse: ->
      super
      @data.characterState = @convertCharacterStateType @readInt8()
      @data.target = @convertTargetType @readInt8()
      @data

  class EventContent.BranchByPartyNumber extends EventContentBase
    parse: ->
      super
      @data.number = @readInt32()
      @data

  class EventContent.PartyShow extends EventContentBase

  class EventContent.PartyHide extends EventContentBase

  class EventContent.EffectBreak extends EventContentBase

  class EventContent.StartCall extends EventContentBase
    parse: ->
      super
      @data.startLabel = @readString()
      @data

  class EventContent.PackageLink extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.PackageCall extends EventContentBase
    parse: ->
      super
      @data.ref = @readInt32()
      @data

  class EventContent.BranchByScene extends EventContentBase

  class EventContent.BranchByBattle extends EventContentBase

  class EventContent.BranchByCompletedStamp extends EventContentBase
    parse: ->
      super
      @data.completedStamp = @readString()
      @data

  class EventContent.CompletedStamp extends EventContentBase
    parse: ->
      super
      @data.completedStamp = @readString()
      @data

  class EventContent.CompletedStampLoss extends EventContentBase
    parse: ->
      super
      @data.completedStamp = @readString()
      @data

  class EventContent.BranchByGossip extends EventContentBase
    parse: ->
      super
      @data.gossip = @readString()
      @data

  class EventContent.Gossip extends EventContentBase
    parse: ->
      super
      @data.gossip = @readString()
      @data

  class EventContent.GossipLoss extends EventContentBase
    parse: ->
      super
      @data.gossip = @readString()
      @data

  class EventContent.BranchByBattleNow extends EventContentBase

  class EventContent.BackgroundRebuild extends EventContentBase

  class EventContent.FlagCheck extends EventContentBase
    parse: ->
      super
      @data.flagName = @readString()
      @data

  createEventContent = (parent) ->
    type = parent.convertEventContentType parent.reader.readInt8()
    parent.reader.seek -1
    upperCamelCasedType = utils.toUpperCamelCase type
    content = new EventContent[upperCamelCasedType](parent)
    content

  exports.createEventContent = createEventContent
  exports
