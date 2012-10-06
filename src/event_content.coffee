define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'
  {BackgroundImage} = require './background_image'
  EventContent = {}

  class EventContentBase extends Base
    parse: ->
      @data.type     = @convertEventContentType @reader.readInt8()
      @data.label    = @reader.readString()
      childrenLength = @reader.readInt32() % 10000
      @data.children = (createEventContent(@).parse() for i in [0...childrenLength])
      @reader.seek 4 if @isInnData
      @data

  class EventContent.Start extends EventContentBase

  class EventContent.StartLink extends EventContentBase
    parse: ->
      super()
      @data.reference = @reader.readString()
      @data

  class EventContent.Battle extends EventContentBase
    parse: ->
      super()
      @data.reference = @reader.readInt32()
      @data

  class EventContent.ScenarioEnd extends EventContentBase
    parse: ->
      super()
      @data.completed = @reader.readBoolean()
      @data

  class EventContent.GameOver extends EventContentBase

  class EventContent.Scene extends EventContentBase
    parse: ->
      super()
      @data.reference = @reader.readInt32()
      @data

  class EventContent.Message extends EventContentBase
    parse: ->
      super()
      @data.image = @reader.readString()
      @data.body = @reader.readString()
      @data

  class EventContent.Music extends EventContentBase
    parse: ->
      super()
      @data.music = @reader.readString()
      @data

  class EventContent.Background extends EventContentBase
    parse: ->
      super()
      bgsLength = @reader.readInt32()
      @data.backgrounds = (new BackgroundImage(@).parse() for i in [0...bgsLength])
      @data

  class EventContent.Sound extends EventContentBase
    parse: ->
      super()
      @data.sound = @reader.readString()
      @data

  class EventContent.Wait extends EventContentBase
    parse: ->
      super()
      @data.time = @reader.readInt32()
      @data

  class EventContent.Effect extends EventContentBase
    parse: ->
      @data.type     = @convertEventContentType @reader.readInt8()
      @data.label    = @reader.readString()
      childrenLength = @reader.readInt32() % 10000
      @data.children = (createEventContent(@).parse() for i in [0...childrenLength])
      @reader.seek 4 if @isInnData
      @data.level = @reader.readInt32()
      @data.target = @convertTargetType @reader.readInt8(), true
      @data.phenomenonType = @convertEffectPhenomenonType @reader.readInt8()
      @data.reactionType = @convertEffectReactionType @reader.readInt8()
      @data.successRate = @reader.readInt32()
      @data.sound = @reader.readString()
      @data.animationType = @convertEffectAnimationType @reader.readInt8()
      effectsLength = @reader.readInt32()
      {Effect} = require './effect'
      @data.effects = (new Effect(@).parse() for i in [0...effectsLength])
      @data

  class EventContent.BranchByMemberSelect extends EventContentBase
    parse: ->
      super()
      @data.targetAll = @reader.readBoolean()
      @data.random = @reader.readBoolean()
      @data

  class EventContent.BranchByAbility extends EventContentBase
    parse: ->
      super()
      @data.value = @reader.readInt32()
      @data.target = @convertTargetType @reader.readInt8()
      @data.aptitude =
        physical: @convertPhysicalAptitudeType @reader.readInt32()
        mental: @convertMentalAptitudeType @reader.readInt32()
      @data

  class EventContent.BranchByRandom extends EventContentBase
    parse: ->
      super()
      @data.probability= @reader.readInt32()
      @data

  class EventContent.BranchByFlag extends EventContentBase
    parse: ->
      super()
      @data.flag = @reader.readString()
      @data

  class EventContent.Flag extends EventContentBase
    parse: ->
      super()
      @data.flag = @reader.readString()
      @data.value = @reader.readBoolean()
      @data

  class EventContent.BranchBySteps extends EventContentBase
    parse: ->
      super()
      @data.steps = @reader.readString()
      @data

  class EventContent.Steps extends EventContentBase
    parse: ->
      super()
      @data.steps = @reader.readString()
      @data.value = @reader.readInt32()
      @data

  class EventContent.BranchByAlly extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.BranchByItem extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.BranchBySkill extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.BranchByInformation extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.BranchByBeast extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.BranchByMoney extends EventContentBase
    parse: ->
      super()
      @data.money = @reader.readInt32()
      @data

  class EventContent.BranchByAchievement extends EventContentBase
    parse: ->
      super()
      @data.achievement = @reader.readString()
      @reader.seek 4 # skip the unknown data
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.Ally extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.Item extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.Skill extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.Information extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.Beast extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.Money extends EventContentBase
    parse: ->
      super()
      @data.money = @reader.readInt32()
      @data

  class EventContent.Achievement extends EventContentBase
    parse: ->
      super()
      @data.achievement = @reader.readString()
      @data.value = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.AllyLoss extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.ItemLoss extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.SkillLoss extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.InformationLoss extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.BeastLoss extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data.number = @reader.readInt32()
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.MoneyLoss extends EventContentBase
    parse: ->
      super()
      @data.money = @reader.readInt32()
      @data

  class EventContent.AchievementLoss extends EventContentBase
    parse: ->
      super()
      @data.achievement = @reader.readString()
      @reader.seek 4 # skip the unknown data
      @data.targetScope = @convertTargetScopeType @reader.readInt8()
      @data

  class EventContent.CharacterMessage extends EventContentBase
    parse: ->
      super()
      @data.target = @convertTargetType @reader.readInt8()
      messageLength = @reader.readInt32()
      @data.messages = (@readMessage() for i in [0...messageLength])
      @data

    readMessage: ->
      achievements: @reader.readString().split('\n')
      body: @reader.readString()

  class EventContent.StepUp extends EventContentBase
    parse: ->
      super()
      @data.steps = @reader.readString()
      @data

  class EventContent.StepDown extends EventContentBase
    parse: ->
      super()
      @data.steps = @reader.readString()
      @data

  class EventContent.FlagReverse extends EventContentBase
    parse: ->
      super()
      @data.flag = @reader.readString()
      @data

  class EventContent.BranchByCurrentStep extends EventContentBase
    parse: ->
      super()
      @data.steps = @reader.readString()
      @data.value = @reader.readInt32()
      @data

  class EventContent.TimePassage extends EventContentBase

  class EventContent.BranchByLevel extends EventContentBase
    parse: ->
      super()
      @data.useAverage = @reader.readBoolean()
      @data.value = @reader.readInt32()
      @data

  class EventContent.BranchByState extends EventContentBase
    parse: ->
      super()
      @data.state = @convertCharacterStateType @reader.readInt8()
      @data.target = @convertTargetType @reader.readInt8()
      @data

  class EventContent.BranchByPartyNumber extends EventContentBase
    parse: ->
      super()
      @data.number = @reader.readInt32()
      @data

  class EventContent.PartyShow extends EventContentBase

  class EventContent.PartyHide extends EventContentBase

  class EventContent.EffectBreak extends EventContentBase

  class EventContent.StartCall extends EventContentBase
    parse: ->
      super()
      @data.start = @reader.readString()
      @data

  class EventContent.PackageLink extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.PackageCall extends EventContentBase
    parse: ->
      super()
      @data.id = @reader.readInt32()
      @data

  class EventContent.BranchByScene extends EventContentBase

  class EventContent.BranchByBattle extends EventContentBase

  class EventContent.BranchByCompletedStamp extends EventContentBase
    parse: ->
      super()
      @data.scenario = @reader.readString()
      @data

  class EventContent.CompletedStamp extends EventContentBase
    parse: ->
      super()
      @data.scenario = @reader.readString()
      @data

  class EventContent.CompletedStampLoss extends EventContentBase
    parse: ->
      super()
      @data.scenario = @reader.readString()
      @data

  class EventContent.BranchByGossip extends EventContentBase
    parse: ->
      super()
      @data.gossip = @reader.readString()
      @data

  class EventContent.Gossip extends EventContentBase
    parse: ->
      super()
      @data.gossip = @reader.readString()
      @data

  class EventContent.GossipLoss extends EventContentBase
    parse: ->
      super()
      @data.gossip = @reader.readString()
      @data

  class EventContent.BranchByBattleNow extends EventContentBase

  class EventContent.BackgroundRebuild extends EventContentBase

  class EventContent.FlagCheck extends EventContentBase
    parse: ->
      super()
      @data.flag = @reader.readString()
      @data

  createEventContent = (parent) ->
    type = parent.convertEventContentType parent.reader.readInt8()
    parent.reader.seek -1
    upperCamelCasedType = type.replace /^./, (s) -> s.toUpperCase()
    content = new EventContent[upperCamelCasedType](parent)
    content

  exports.createEventContent = createEventContent
  exports
