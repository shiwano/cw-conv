(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define = this.define || require('amdefine')(module);

  define(function(require, exports, module) {
    var BackgroundImage, Base, EventElement, EventElementBase, createEventElement, utils;
    utils = require('./utils');
    Base = require('./base').Base;
    BackgroundImage = require('./background_image').BackgroundImage;
    EventElement = {};
    EventElementBase = (function(_super) {

      __extends(EventElementBase, _super);

      function EventElementBase() {
        return EventElementBase.__super__.constructor.apply(this, arguments);
      }

      EventElementBase.prototype.parse = function() {
        var _this = this;
        this.data.type = this.convertEventElementType(this.readInt8());
        this.data.label = this.readString();
        this.data.children = this.readArray((function() {
          return createEventElement(_this).parse();
        }), this.readInt32() % 10000);
        if (this.isInnData) {
          this.seek(4);
        }
        return this.data;
      };

      return EventElementBase;

    })(Base);
    EventElement.Start = (function(_super) {

      __extends(Start, _super);

      function Start() {
        return Start.__super__.constructor.apply(this, arguments);
      }

      return Start;

    })(EventElementBase);
    EventElement.StartLink = (function(_super) {

      __extends(StartLink, _super);

      function StartLink() {
        return StartLink.__super__.constructor.apply(this, arguments);
      }

      StartLink.prototype.parse = function() {
        StartLink.__super__.parse.apply(this, arguments);
        this.data.startLabel = this.readString();
        return this.data;
      };

      return StartLink;

    })(EventElementBase);
    EventElement.Battle = (function(_super) {

      __extends(Battle, _super);

      function Battle() {
        return Battle.__super__.constructor.apply(this, arguments);
      }

      Battle.prototype.parse = function() {
        Battle.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return Battle;

    })(EventElementBase);
    EventElement.ScenarioEnd = (function(_super) {

      __extends(ScenarioEnd, _super);

      function ScenarioEnd() {
        return ScenarioEnd.__super__.constructor.apply(this, arguments);
      }

      ScenarioEnd.prototype.parse = function() {
        ScenarioEnd.__super__.parse.apply(this, arguments);
        this.data.completed = this.readBoolean();
        return this.data;
      };

      return ScenarioEnd;

    })(EventElementBase);
    EventElement.GameOver = (function(_super) {

      __extends(GameOver, _super);

      function GameOver() {
        return GameOver.__super__.constructor.apply(this, arguments);
      }

      return GameOver;

    })(EventElementBase);
    EventElement.Scene = (function(_super) {

      __extends(Scene, _super);

      function Scene() {
        return Scene.__super__.constructor.apply(this, arguments);
      }

      Scene.prototype.parse = function() {
        Scene.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return Scene;

    })(EventElementBase);
    EventElement.Message = (function(_super) {

      __extends(Message, _super);

      function Message() {
        return Message.__super__.constructor.apply(this, arguments);
      }

      Message.prototype.parse = function() {
        Message.__super__.parse.apply(this, arguments);
        this.data.image = this.readString();
        this.data.message = this.readString();
        return this.data;
      };

      return Message;

    })(EventElementBase);
    EventElement.Music = (function(_super) {

      __extends(Music, _super);

      function Music() {
        return Music.__super__.constructor.apply(this, arguments);
      }

      Music.prototype.parse = function() {
        Music.__super__.parse.apply(this, arguments);
        this.data.music = this.readString();
        return this.data;
      };

      return Music;

    })(EventElementBase);
    EventElement.Background = (function(_super) {

      __extends(Background, _super);

      function Background() {
        return Background.__super__.constructor.apply(this, arguments);
      }

      Background.prototype.parse = function() {
        var _this = this;
        Background.__super__.parse.apply(this, arguments);
        this.data.backgrounds = this.readArray(function() {
          return new BackgroundImage(_this).parse();
        });
        return this.data;
      };

      return Background;

    })(EventElementBase);
    EventElement.Sound = (function(_super) {

      __extends(Sound, _super);

      function Sound() {
        return Sound.__super__.constructor.apply(this, arguments);
      }

      Sound.prototype.parse = function() {
        Sound.__super__.parse.apply(this, arguments);
        this.data.sound = this.readString();
        return this.data;
      };

      return Sound;

    })(EventElementBase);
    EventElement.Wait = (function(_super) {

      __extends(Wait, _super);

      function Wait() {
        return Wait.__super__.constructor.apply(this, arguments);
      }

      Wait.prototype.parse = function() {
        Wait.__super__.parse.apply(this, arguments);
        this.data.duration = this.readInt32();
        return this.data;
      };

      return Wait;

    })(EventElementBase);
    EventElement.Effect = (function(_super) {

      __extends(Effect, _super);

      function Effect() {
        return Effect.__super__.constructor.apply(this, arguments);
      }

      Effect.prototype.parse = function() {
        var Effect,
          _this = this;
        Effect = require('./effect').Effect;
        this.data.type = this.convertEventElementType(this.readInt8());
        this.data.label = this.readString();
        this.data.children = this.readArray((function() {
          return createEventElement(_this).parse();
        }), this.readInt32() % 10000);
        if (this.isInnData) {
          this.seek(4);
        }
        this.data.level = this.readInt32();
        this.data.target = this.convertTargetType(this.readInt8(), true);
        this.data.phenomenonType = this.convertEffectPhenomenonType(this.readInt8());
        this.data.reactionType = this.convertEffectReactionType(this.readInt8());
        this.data.successRate = this.readInt32();
        this.data.sound = this.readString();
        this.data.animationType = this.convertEffectAnimationType(this.readInt8());
        this.data.effects = this.readArray(function() {
          return new Effect(_this).parse();
        });
        return this.data;
      };

      return Effect;

    })(EventElementBase);
    EventElement.BranchByMemberSelect = (function(_super) {

      __extends(BranchByMemberSelect, _super);

      function BranchByMemberSelect() {
        return BranchByMemberSelect.__super__.constructor.apply(this, arguments);
      }

      BranchByMemberSelect.prototype.parse = function() {
        BranchByMemberSelect.__super__.parse.apply(this, arguments);
        this.data.targetAll = this.readBoolean();
        this.data.random = this.readBoolean();
        return this.data;
      };

      return BranchByMemberSelect;

    })(EventElementBase);
    EventElement.BranchByAbility = (function(_super) {

      __extends(BranchByAbility, _super);

      function BranchByAbility() {
        return BranchByAbility.__super__.constructor.apply(this, arguments);
      }

      BranchByAbility.prototype.parse = function() {
        BranchByAbility.__super__.parse.apply(this, arguments);
        this.data.value = this.readInt32();
        this.data.target = this.convertTargetType(this.readInt8());
        this.data.physicalAptitude = this.convertPhysicalAptitudeType(this.readInt32());
        this.data.mentalAptitude = this.convertMentalAptitudeType(this.readInt32());
        return this.data;
      };

      return BranchByAbility;

    })(EventElementBase);
    EventElement.BranchByRandom = (function(_super) {

      __extends(BranchByRandom, _super);

      function BranchByRandom() {
        return BranchByRandom.__super__.constructor.apply(this, arguments);
      }

      BranchByRandom.prototype.parse = function() {
        BranchByRandom.__super__.parse.apply(this, arguments);
        this.data.probability = this.readInt32();
        return this.data;
      };

      return BranchByRandom;

    })(EventElementBase);
    EventElement.BranchByFlag = (function(_super) {

      __extends(BranchByFlag, _super);

      function BranchByFlag() {
        return BranchByFlag.__super__.constructor.apply(this, arguments);
      }

      BranchByFlag.prototype.parse = function() {
        BranchByFlag.__super__.parse.apply(this, arguments);
        this.data.flagName = this.readString();
        return this.data;
      };

      return BranchByFlag;

    })(EventElementBase);
    EventElement.Flag = (function(_super) {

      __extends(Flag, _super);

      function Flag() {
        return Flag.__super__.constructor.apply(this, arguments);
      }

      Flag.prototype.parse = function() {
        Flag.__super__.parse.apply(this, arguments);
        this.data.flagName = this.readString();
        this.data.flag = this.readBoolean();
        return this.data;
      };

      return Flag;

    })(EventElementBase);
    EventElement.BranchBySteps = (function(_super) {

      __extends(BranchBySteps, _super);

      function BranchBySteps() {
        return BranchBySteps.__super__.constructor.apply(this, arguments);
      }

      BranchBySteps.prototype.parse = function() {
        BranchBySteps.__super__.parse.apply(this, arguments);
        this.data.stepsName = this.readString();
        return this.data;
      };

      return BranchBySteps;

    })(EventElementBase);
    EventElement.Steps = (function(_super) {

      __extends(Steps, _super);

      function Steps() {
        return Steps.__super__.constructor.apply(this, arguments);
      }

      Steps.prototype.parse = function() {
        Steps.__super__.parse.apply(this, arguments);
        this.data.stepsName = this.readString();
        this.data.step = this.readInt32();
        return this.data;
      };

      return Steps;

    })(EventElementBase);
    EventElement.BranchByFriend = (function(_super) {

      __extends(BranchByFriend, _super);

      function BranchByFriend() {
        return BranchByFriend.__super__.constructor.apply(this, arguments);
      }

      BranchByFriend.prototype.parse = function() {
        BranchByFriend.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return BranchByFriend;

    })(EventElementBase);
    EventElement.BranchByItem = (function(_super) {

      __extends(BranchByItem, _super);

      function BranchByItem() {
        return BranchByItem.__super__.constructor.apply(this, arguments);
      }

      BranchByItem.prototype.parse = function() {
        BranchByItem.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return BranchByItem;

    })(EventElementBase);
    EventElement.BranchBySkill = (function(_super) {

      __extends(BranchBySkill, _super);

      function BranchBySkill() {
        return BranchBySkill.__super__.constructor.apply(this, arguments);
      }

      BranchBySkill.prototype.parse = function() {
        BranchBySkill.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return BranchBySkill;

    })(EventElementBase);
    EventElement.BranchByInformation = (function(_super) {

      __extends(BranchByInformation, _super);

      function BranchByInformation() {
        return BranchByInformation.__super__.constructor.apply(this, arguments);
      }

      BranchByInformation.prototype.parse = function() {
        BranchByInformation.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return BranchByInformation;

    })(EventElementBase);
    EventElement.BranchByBeast = (function(_super) {

      __extends(BranchByBeast, _super);

      function BranchByBeast() {
        return BranchByBeast.__super__.constructor.apply(this, arguments);
      }

      BranchByBeast.prototype.parse = function() {
        BranchByBeast.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return BranchByBeast;

    })(EventElementBase);
    EventElement.BranchByMoney = (function(_super) {

      __extends(BranchByMoney, _super);

      function BranchByMoney() {
        return BranchByMoney.__super__.constructor.apply(this, arguments);
      }

      BranchByMoney.prototype.parse = function() {
        BranchByMoney.__super__.parse.apply(this, arguments);
        this.data.money = this.readInt32();
        return this.data;
      };

      return BranchByMoney;

    })(EventElementBase);
    EventElement.BranchByAchievement = (function(_super) {

      __extends(BranchByAchievement, _super);

      function BranchByAchievement() {
        return BranchByAchievement.__super__.constructor.apply(this, arguments);
      }

      BranchByAchievement.prototype.parse = function() {
        BranchByAchievement.__super__.parse.apply(this, arguments);
        this.data.achievement = this.readString();
        this.seek(4);
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return BranchByAchievement;

    })(EventElementBase);
    EventElement.Friend = (function(_super) {

      __extends(Friend, _super);

      function Friend() {
        return Friend.__super__.constructor.apply(this, arguments);
      }

      Friend.prototype.parse = function() {
        Friend.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return Friend;

    })(EventElementBase);
    EventElement.Item = (function(_super) {

      __extends(Item, _super);

      function Item() {
        return Item.__super__.constructor.apply(this, arguments);
      }

      Item.prototype.parse = function() {
        Item.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return Item;

    })(EventElementBase);
    EventElement.Skill = (function(_super) {

      __extends(Skill, _super);

      function Skill() {
        return Skill.__super__.constructor.apply(this, arguments);
      }

      Skill.prototype.parse = function() {
        Skill.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return Skill;

    })(EventElementBase);
    EventElement.Information = (function(_super) {

      __extends(Information, _super);

      function Information() {
        return Information.__super__.constructor.apply(this, arguments);
      }

      Information.prototype.parse = function() {
        Information.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return Information;

    })(EventElementBase);
    EventElement.Beast = (function(_super) {

      __extends(Beast, _super);

      function Beast() {
        return Beast.__super__.constructor.apply(this, arguments);
      }

      Beast.prototype.parse = function() {
        Beast.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return Beast;

    })(EventElementBase);
    EventElement.Money = (function(_super) {

      __extends(Money, _super);

      function Money() {
        return Money.__super__.constructor.apply(this, arguments);
      }

      Money.prototype.parse = function() {
        Money.__super__.parse.apply(this, arguments);
        this.data.money = this.readInt32();
        return this.data;
      };

      return Money;

    })(EventElementBase);
    EventElement.Achievement = (function(_super) {

      __extends(Achievement, _super);

      function Achievement() {
        return Achievement.__super__.constructor.apply(this, arguments);
      }

      Achievement.prototype.parse = function() {
        Achievement.__super__.parse.apply(this, arguments);
        this.data.achievement = this.readString();
        this.data.achievementScore = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return Achievement;

    })(EventElementBase);
    EventElement.FriendLoss = (function(_super) {

      __extends(FriendLoss, _super);

      function FriendLoss() {
        return FriendLoss.__super__.constructor.apply(this, arguments);
      }

      FriendLoss.prototype.parse = function() {
        FriendLoss.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return FriendLoss;

    })(EventElementBase);
    EventElement.ItemLoss = (function(_super) {

      __extends(ItemLoss, _super);

      function ItemLoss() {
        return ItemLoss.__super__.constructor.apply(this, arguments);
      }

      ItemLoss.prototype.parse = function() {
        ItemLoss.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return ItemLoss;

    })(EventElementBase);
    EventElement.SkillLoss = (function(_super) {

      __extends(SkillLoss, _super);

      function SkillLoss() {
        return SkillLoss.__super__.constructor.apply(this, arguments);
      }

      SkillLoss.prototype.parse = function() {
        SkillLoss.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return SkillLoss;

    })(EventElementBase);
    EventElement.InformationLoss = (function(_super) {

      __extends(InformationLoss, _super);

      function InformationLoss() {
        return InformationLoss.__super__.constructor.apply(this, arguments);
      }

      InformationLoss.prototype.parse = function() {
        InformationLoss.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return InformationLoss;

    })(EventElementBase);
    EventElement.BeastLoss = (function(_super) {

      __extends(BeastLoss, _super);

      function BeastLoss() {
        return BeastLoss.__super__.constructor.apply(this, arguments);
      }

      BeastLoss.prototype.parse = function() {
        BeastLoss.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        this.data.number = this.readInt32();
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return BeastLoss;

    })(EventElementBase);
    EventElement.MoneyLoss = (function(_super) {

      __extends(MoneyLoss, _super);

      function MoneyLoss() {
        return MoneyLoss.__super__.constructor.apply(this, arguments);
      }

      MoneyLoss.prototype.parse = function() {
        MoneyLoss.__super__.parse.apply(this, arguments);
        this.data.money = this.readInt32();
        return this.data;
      };

      return MoneyLoss;

    })(EventElementBase);
    EventElement.AchievementLoss = (function(_super) {

      __extends(AchievementLoss, _super);

      function AchievementLoss() {
        return AchievementLoss.__super__.constructor.apply(this, arguments);
      }

      AchievementLoss.prototype.parse = function() {
        AchievementLoss.__super__.parse.apply(this, arguments);
        this.data.achievement = this.readString();
        this.seek(4);
        this.data.targetScope = this.convertTargetScopeType(this.readInt8());
        return this.data;
      };

      return AchievementLoss;

    })(EventElementBase);
    EventElement.CharacterMessage = (function(_super) {

      __extends(CharacterMessage, _super);

      function CharacterMessage() {
        return CharacterMessage.__super__.constructor.apply(this, arguments);
      }

      CharacterMessage.prototype.parse = function() {
        var _this = this;
        CharacterMessage.__super__.parse.apply(this, arguments);
        this.data.target = this.convertTargetType(this.readInt8());
        this.data.messages = this.readArray(function() {
          return _this.readMessage();
        });
        return this.data;
      };

      CharacterMessage.prototype.readMessage = function() {
        var achievements;
        achievements = this.readString();
        return {
          achievements: achievements ? achievements.split('\n') : [],
          message: this.readString()
        };
      };

      return CharacterMessage;

    })(EventElementBase);
    EventElement.StepUp = (function(_super) {

      __extends(StepUp, _super);

      function StepUp() {
        return StepUp.__super__.constructor.apply(this, arguments);
      }

      StepUp.prototype.parse = function() {
        StepUp.__super__.parse.apply(this, arguments);
        this.data.stepsName = this.readString();
        return this.data;
      };

      return StepUp;

    })(EventElementBase);
    EventElement.StepDown = (function(_super) {

      __extends(StepDown, _super);

      function StepDown() {
        return StepDown.__super__.constructor.apply(this, arguments);
      }

      StepDown.prototype.parse = function() {
        StepDown.__super__.parse.apply(this, arguments);
        this.data.stepsName = this.readString();
        return this.data;
      };

      return StepDown;

    })(EventElementBase);
    EventElement.FlagReverse = (function(_super) {

      __extends(FlagReverse, _super);

      function FlagReverse() {
        return FlagReverse.__super__.constructor.apply(this, arguments);
      }

      FlagReverse.prototype.parse = function() {
        FlagReverse.__super__.parse.apply(this, arguments);
        this.data.flagName = this.readString();
        return this.data;
      };

      return FlagReverse;

    })(EventElementBase);
    EventElement.BranchByCurrentStep = (function(_super) {

      __extends(BranchByCurrentStep, _super);

      function BranchByCurrentStep() {
        return BranchByCurrentStep.__super__.constructor.apply(this, arguments);
      }

      BranchByCurrentStep.prototype.parse = function() {
        BranchByCurrentStep.__super__.parse.apply(this, arguments);
        this.data.stepsName = this.readString();
        this.data.step = this.readInt32();
        return this.data;
      };

      return BranchByCurrentStep;

    })(EventElementBase);
    EventElement.TimePassage = (function(_super) {

      __extends(TimePassage, _super);

      function TimePassage() {
        return TimePassage.__super__.constructor.apply(this, arguments);
      }

      return TimePassage;

    })(EventElementBase);
    EventElement.BranchByLevel = (function(_super) {

      __extends(BranchByLevel, _super);

      function BranchByLevel() {
        return BranchByLevel.__super__.constructor.apply(this, arguments);
      }

      BranchByLevel.prototype.parse = function() {
        BranchByLevel.__super__.parse.apply(this, arguments);
        this.data.useAverage = this.readBoolean();
        this.data.level = this.readInt32();
        return this.data;
      };

      return BranchByLevel;

    })(EventElementBase);
    EventElement.BranchByCharacterState = (function(_super) {

      __extends(BranchByCharacterState, _super);

      function BranchByCharacterState() {
        return BranchByCharacterState.__super__.constructor.apply(this, arguments);
      }

      BranchByCharacterState.prototype.parse = function() {
        BranchByCharacterState.__super__.parse.apply(this, arguments);
        this.data.characterState = this.convertCharacterStateType(this.readInt8());
        this.data.target = this.convertTargetType(this.readInt8());
        return this.data;
      };

      return BranchByCharacterState;

    })(EventElementBase);
    EventElement.BranchByPartyNumber = (function(_super) {

      __extends(BranchByPartyNumber, _super);

      function BranchByPartyNumber() {
        return BranchByPartyNumber.__super__.constructor.apply(this, arguments);
      }

      BranchByPartyNumber.prototype.parse = function() {
        BranchByPartyNumber.__super__.parse.apply(this, arguments);
        this.data.number = this.readInt32();
        return this.data;
      };

      return BranchByPartyNumber;

    })(EventElementBase);
    EventElement.PartyShow = (function(_super) {

      __extends(PartyShow, _super);

      function PartyShow() {
        return PartyShow.__super__.constructor.apply(this, arguments);
      }

      return PartyShow;

    })(EventElementBase);
    EventElement.PartyHide = (function(_super) {

      __extends(PartyHide, _super);

      function PartyHide() {
        return PartyHide.__super__.constructor.apply(this, arguments);
      }

      return PartyHide;

    })(EventElementBase);
    EventElement.EffectBreak = (function(_super) {

      __extends(EffectBreak, _super);

      function EffectBreak() {
        return EffectBreak.__super__.constructor.apply(this, arguments);
      }

      return EffectBreak;

    })(EventElementBase);
    EventElement.StartCall = (function(_super) {

      __extends(StartCall, _super);

      function StartCall() {
        return StartCall.__super__.constructor.apply(this, arguments);
      }

      StartCall.prototype.parse = function() {
        StartCall.__super__.parse.apply(this, arguments);
        this.data.startLabel = this.readString();
        return this.data;
      };

      return StartCall;

    })(EventElementBase);
    EventElement.PackageLink = (function(_super) {

      __extends(PackageLink, _super);

      function PackageLink() {
        return PackageLink.__super__.constructor.apply(this, arguments);
      }

      PackageLink.prototype.parse = function() {
        PackageLink.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return PackageLink;

    })(EventElementBase);
    EventElement.PackageCall = (function(_super) {

      __extends(PackageCall, _super);

      function PackageCall() {
        return PackageCall.__super__.constructor.apply(this, arguments);
      }

      PackageCall.prototype.parse = function() {
        PackageCall.__super__.parse.apply(this, arguments);
        this.data.ref = this.readInt32();
        return this.data;
      };

      return PackageCall;

    })(EventElementBase);
    EventElement.BranchByScene = (function(_super) {

      __extends(BranchByScene, _super);

      function BranchByScene() {
        return BranchByScene.__super__.constructor.apply(this, arguments);
      }

      return BranchByScene;

    })(EventElementBase);
    EventElement.BranchByBattle = (function(_super) {

      __extends(BranchByBattle, _super);

      function BranchByBattle() {
        return BranchByBattle.__super__.constructor.apply(this, arguments);
      }

      return BranchByBattle;

    })(EventElementBase);
    EventElement.BranchByCompletedStamp = (function(_super) {

      __extends(BranchByCompletedStamp, _super);

      function BranchByCompletedStamp() {
        return BranchByCompletedStamp.__super__.constructor.apply(this, arguments);
      }

      BranchByCompletedStamp.prototype.parse = function() {
        BranchByCompletedStamp.__super__.parse.apply(this, arguments);
        this.data.completedStamp = this.readString();
        return this.data;
      };

      return BranchByCompletedStamp;

    })(EventElementBase);
    EventElement.CompletedStamp = (function(_super) {

      __extends(CompletedStamp, _super);

      function CompletedStamp() {
        return CompletedStamp.__super__.constructor.apply(this, arguments);
      }

      CompletedStamp.prototype.parse = function() {
        CompletedStamp.__super__.parse.apply(this, arguments);
        this.data.completedStamp = this.readString();
        return this.data;
      };

      return CompletedStamp;

    })(EventElementBase);
    EventElement.CompletedStampLoss = (function(_super) {

      __extends(CompletedStampLoss, _super);

      function CompletedStampLoss() {
        return CompletedStampLoss.__super__.constructor.apply(this, arguments);
      }

      CompletedStampLoss.prototype.parse = function() {
        CompletedStampLoss.__super__.parse.apply(this, arguments);
        this.data.completedStamp = this.readString();
        return this.data;
      };

      return CompletedStampLoss;

    })(EventElementBase);
    EventElement.BranchByGossip = (function(_super) {

      __extends(BranchByGossip, _super);

      function BranchByGossip() {
        return BranchByGossip.__super__.constructor.apply(this, arguments);
      }

      BranchByGossip.prototype.parse = function() {
        BranchByGossip.__super__.parse.apply(this, arguments);
        this.data.gossip = this.readString();
        return this.data;
      };

      return BranchByGossip;

    })(EventElementBase);
    EventElement.Gossip = (function(_super) {

      __extends(Gossip, _super);

      function Gossip() {
        return Gossip.__super__.constructor.apply(this, arguments);
      }

      Gossip.prototype.parse = function() {
        Gossip.__super__.parse.apply(this, arguments);
        this.data.gossip = this.readString();
        return this.data;
      };

      return Gossip;

    })(EventElementBase);
    EventElement.GossipLoss = (function(_super) {

      __extends(GossipLoss, _super);

      function GossipLoss() {
        return GossipLoss.__super__.constructor.apply(this, arguments);
      }

      GossipLoss.prototype.parse = function() {
        GossipLoss.__super__.parse.apply(this, arguments);
        this.data.gossip = this.readString();
        return this.data;
      };

      return GossipLoss;

    })(EventElementBase);
    EventElement.BranchByBattleNow = (function(_super) {

      __extends(BranchByBattleNow, _super);

      function BranchByBattleNow() {
        return BranchByBattleNow.__super__.constructor.apply(this, arguments);
      }

      return BranchByBattleNow;

    })(EventElementBase);
    EventElement.BackgroundRebuild = (function(_super) {

      __extends(BackgroundRebuild, _super);

      function BackgroundRebuild() {
        return BackgroundRebuild.__super__.constructor.apply(this, arguments);
      }

      return BackgroundRebuild;

    })(EventElementBase);
    EventElement.FlagCheck = (function(_super) {

      __extends(FlagCheck, _super);

      function FlagCheck() {
        return FlagCheck.__super__.constructor.apply(this, arguments);
      }

      FlagCheck.prototype.parse = function() {
        FlagCheck.__super__.parse.apply(this, arguments);
        this.data.flagName = this.readString();
        return this.data;
      };

      return FlagCheck;

    })(EventElementBase);
    createEventElement = function(parent) {
      var element, type, upperCamelCasedType;
      type = parent.convertEventElementType(parent.reader.readInt8());
      parent.reader.seek(-1);
      upperCamelCasedType = utils.toUpperCamelCase(type);
      element = new EventElement[upperCamelCasedType](parent);
      return element;
    };
    exports.createEventElement = createEventElement;
    return exports;
  });

}).call(this);
