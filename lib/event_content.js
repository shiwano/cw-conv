if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var BackgroundImage, Base, Effect, EventContent, EventContentBase, createEventContent;
  Effect = require('./effect').Effect;
  Base = require('./base').Base;
  BackgroundImage = require('./background_image').BackgroundImage;
  EventContent = {};
  EventContentBase = (function(_super) {

    __extends(EventContentBase, _super);

    function EventContentBase() {
      return EventContentBase.__super__.constructor.apply(this, arguments);
    }

    EventContentBase.prototype.parse = function() {
      var childrenLength, i;
      this.data.type = this.convertEventContentType(this.reader.readInt8());
      this.data.label = this.reader.readString();
      childrenLength = this.reader.readInt32() % 10000;
      this.data.children = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= childrenLength ? _i < childrenLength : _i > childrenLength; i = 0 <= childrenLength ? ++_i : --_i) {
          _results.push(createEventContent(this).parse());
        }
        return _results;
      }).call(this);
      if (this.isInnData) {
        this.reader.seek(4);
      }
      return this.data;
    };

    return EventContentBase;

  })(Base);
  EventContent.Start = (function(_super) {

    __extends(Start, _super);

    function Start() {
      return Start.__super__.constructor.apply(this, arguments);
    }

    return Start;

  })(EventContentBase);
  EventContent.StartLink = (function(_super) {

    __extends(StartLink, _super);

    function StartLink() {
      return StartLink.__super__.constructor.apply(this, arguments);
    }

    StartLink.prototype.parse = function() {
      StartLink.__super__.parse.call(this);
      this.data.reference = this.reader.readString();
      return this.data;
    };

    return StartLink;

  })(EventContentBase);
  EventContent.Battle = (function(_super) {

    __extends(Battle, _super);

    function Battle() {
      return Battle.__super__.constructor.apply(this, arguments);
    }

    Battle.prototype.parse = function() {
      Battle.__super__.parse.call(this);
      this.data.reference = this.reader.readInt32();
      return this.data;
    };

    return Battle;

  })(EventContentBase);
  EventContent.ScenarioEnd = (function(_super) {

    __extends(ScenarioEnd, _super);

    function ScenarioEnd() {
      return ScenarioEnd.__super__.constructor.apply(this, arguments);
    }

    ScenarioEnd.prototype.parse = function() {
      ScenarioEnd.__super__.parse.call(this);
      this.data.completed = this.reader.readBoolean();
      return this.data;
    };

    return ScenarioEnd;

  })(EventContentBase);
  EventContent.GameOver = (function(_super) {

    __extends(GameOver, _super);

    function GameOver() {
      return GameOver.__super__.constructor.apply(this, arguments);
    }

    return GameOver;

  })(EventContentBase);
  EventContent.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene() {
      return Scene.__super__.constructor.apply(this, arguments);
    }

    Scene.prototype.parse = function() {
      Scene.__super__.parse.call(this);
      this.data.reference = this.reader.readInt32();
      return this.data;
    };

    return Scene;

  })(EventContentBase);
  EventContent.Message = (function(_super) {

    __extends(Message, _super);

    function Message() {
      return Message.__super__.constructor.apply(this, arguments);
    }

    Message.prototype.parse = function() {
      Message.__super__.parse.call(this);
      this.data.image = this.reader.readString();
      this.data.body = this.reader.readString();
      return this.data;
    };

    return Message;

  })(EventContentBase);
  EventContent.Music = (function(_super) {

    __extends(Music, _super);

    function Music() {
      return Music.__super__.constructor.apply(this, arguments);
    }

    Music.prototype.parse = function() {
      Music.__super__.parse.call(this);
      this.data.music = this.reader.readString();
      return this.data;
    };

    return Music;

  })(EventContentBase);
  EventContent.Background = (function(_super) {

    __extends(Background, _super);

    function Background() {
      return Background.__super__.constructor.apply(this, arguments);
    }

    Background.prototype.parse = function() {
      var bgsLength, i;
      Background.__super__.parse.call(this);
      bgsLength = this.reader.readInt32();
      this.data.backgrounds = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= bgsLength ? _i < bgsLength : _i > bgsLength; i = 0 <= bgsLength ? ++_i : --_i) {
          _results.push(new BackgroundImage(this).parse());
        }
        return _results;
      }).call(this);
      return this.data;
    };

    return Background;

  })(EventContentBase);
  EventContent.Sound = (function(_super) {

    __extends(Sound, _super);

    function Sound() {
      return Sound.__super__.constructor.apply(this, arguments);
    }

    Sound.prototype.parse = function() {
      Sound.__super__.parse.call(this);
      this.data.sound = this.reader.readString();
      return this.data;
    };

    return Sound;

  })(EventContentBase);
  EventContent.Wait = (function(_super) {

    __extends(Wait, _super);

    function Wait() {
      return Wait.__super__.constructor.apply(this, arguments);
    }

    Wait.prototype.parse = function() {
      Wait.__super__.parse.call(this);
      this.data.time = this.reader.readInt32();
      return this.data;
    };

    return Wait;

  })(EventContentBase);
  EventContent.Effect = (function(_super) {

    __extends(Effect, _super);

    function Effect() {
      return Effect.__super__.constructor.apply(this, arguments);
    }

    Effect.prototype.parse = function() {
      var effectsLength, i;
      Effect.__super__.parse.call(this);
      this.data.level = this.reader.readInt32();
      this.data.target = this.convertTargetType(this.reader.readInt8(), true);
      this.data.phenomenonType = this.convertEffectPhenomenonType(this.reader.readInt8());
      this.data.reactionType = this.convertEffectReactionType(this.reader.readInt8());
      this.data.successRate = this.reader.readInt32();
      this.data.sound = this.reader.readString();
      this.data.animationType = this.convertEffectAnimationType(this.reader.readInt8());
      effectsLength = this.reader.readInt32();
      this.data.effects = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= effectsLength ? _i < effectsLength : _i > effectsLength; i = 0 <= effectsLength ? ++_i : --_i) {
          _results.push(new Effect(this).parse());
        }
        return _results;
      }).call(this);
      return this.data;
    };

    return Effect;

  })(EventContentBase);
  EventContent.BranchByMemberSelect = (function(_super) {

    __extends(BranchByMemberSelect, _super);

    function BranchByMemberSelect() {
      return BranchByMemberSelect.__super__.constructor.apply(this, arguments);
    }

    BranchByMemberSelect.prototype.parse = function() {
      BranchByMemberSelect.__super__.parse.call(this);
      this.data.targetAll = this.reader.readBoolean();
      this.data.random = this.reader.readBoolean();
      return this.data;
    };

    return BranchByMemberSelect;

  })(EventContentBase);
  EventContent.BranchByAbility = (function(_super) {

    __extends(BranchByAbility, _super);

    function BranchByAbility() {
      return BranchByAbility.__super__.constructor.apply(this, arguments);
    }

    BranchByAbility.prototype.parse = function() {
      BranchByAbility.__super__.parse.call(this);
      this.data.value = this.reader.readInt32();
      this.data.target = this.convertTargetType(this.reader.readInt8());
      this.data.aptitude = {
        physical: this.convertPhysicalAptitudeType(this.reader.readInt32()),
        mental: this.convertMentalAptitudeType(this.reader.readInt32())
      };
      return this.data;
    };

    return BranchByAbility;

  })(EventContentBase);
  EventContent.BranchByRandom = (function(_super) {

    __extends(BranchByRandom, _super);

    function BranchByRandom() {
      return BranchByRandom.__super__.constructor.apply(this, arguments);
    }

    BranchByRandom.prototype.parse = function() {
      BranchByRandom.__super__.parse.call(this);
      this.data.probability = this.reader.readInt32();
      return this.data;
    };

    return BranchByRandom;

  })(EventContentBase);
  EventContent.BranchByFlag = (function(_super) {

    __extends(BranchByFlag, _super);

    function BranchByFlag() {
      return BranchByFlag.__super__.constructor.apply(this, arguments);
    }

    BranchByFlag.prototype.parse = function() {
      BranchByFlag.__super__.parse.call(this);
      this.data.flag = this.reader.readString();
      return this.data;
    };

    return BranchByFlag;

  })(EventContentBase);
  EventContent.Flag = (function(_super) {

    __extends(Flag, _super);

    function Flag() {
      return Flag.__super__.constructor.apply(this, arguments);
    }

    Flag.prototype.parse = function() {
      Flag.__super__.parse.call(this);
      this.data.flag = this.reader.readString();
      this.data.value = this.reader.readBoolean();
      return this.data;
    };

    return Flag;

  })(EventContentBase);
  EventContent.BranchBySteps = (function(_super) {

    __extends(BranchBySteps, _super);

    function BranchBySteps() {
      return BranchBySteps.__super__.constructor.apply(this, arguments);
    }

    BranchBySteps.prototype.parse = function() {
      BranchBySteps.__super__.parse.call(this);
      this.data.steps = this.reader.readString();
      return this.data;
    };

    return BranchBySteps;

  })(EventContentBase);
  EventContent.Steps = (function(_super) {

    __extends(Steps, _super);

    function Steps() {
      return Steps.__super__.constructor.apply(this, arguments);
    }

    Steps.prototype.parse = function() {
      Steps.__super__.parse.call(this);
      this.data.steps = this.reader.readString();
      this.data.value = this.reader.readInt32();
      return this.data;
    };

    return Steps;

  })(EventContentBase);
  EventContent.BranchByCast = (function(_super) {

    __extends(BranchByCast, _super);

    function BranchByCast() {
      return BranchByCast.__super__.constructor.apply(this, arguments);
    }

    BranchByCast.prototype.parse = function() {
      BranchByCast.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return BranchByCast;

  })(EventContentBase);
  EventContent.BranchByItem = (function(_super) {

    __extends(BranchByItem, _super);

    function BranchByItem() {
      return BranchByItem.__super__.constructor.apply(this, arguments);
    }

    BranchByItem.prototype.parse = function() {
      BranchByItem.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return BranchByItem;

  })(EventContentBase);
  EventContent.BranchBySkill = (function(_super) {

    __extends(BranchBySkill, _super);

    function BranchBySkill() {
      return BranchBySkill.__super__.constructor.apply(this, arguments);
    }

    BranchBySkill.prototype.parse = function() {
      BranchBySkill.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return BranchBySkill;

  })(EventContentBase);
  EventContent.BranchByInformation = (function(_super) {

    __extends(BranchByInformation, _super);

    function BranchByInformation() {
      return BranchByInformation.__super__.constructor.apply(this, arguments);
    }

    BranchByInformation.prototype.parse = function() {
      BranchByInformation.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return BranchByInformation;

  })(EventContentBase);
  EventContent.BranchByBeast = (function(_super) {

    __extends(BranchByBeast, _super);

    function BranchByBeast() {
      return BranchByBeast.__super__.constructor.apply(this, arguments);
    }

    BranchByBeast.prototype.parse = function() {
      BranchByBeast.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return BranchByBeast;

  })(EventContentBase);
  EventContent.BranchByMoney = (function(_super) {

    __extends(BranchByMoney, _super);

    function BranchByMoney() {
      return BranchByMoney.__super__.constructor.apply(this, arguments);
    }

    BranchByMoney.prototype.parse = function() {
      BranchByMoney.__super__.parse.call(this);
      this.data.money = this.reader.readInt32();
      return this.data;
    };

    return BranchByMoney;

  })(EventContentBase);
  EventContent.BranchByAchievement = (function(_super) {

    __extends(BranchByAchievement, _super);

    function BranchByAchievement() {
      return BranchByAchievement.__super__.constructor.apply(this, arguments);
    }

    BranchByAchievement.prototype.parse = function() {
      BranchByAchievement.__super__.parse.call(this);
      this.data.achievement = this.reader.readString();
      this.reader.skip(4);
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return BranchByAchievement;

  })(EventContentBase);
  EventContent.Ally = (function(_super) {

    __extends(Ally, _super);

    function Ally() {
      return Ally.__super__.constructor.apply(this, arguments);
    }

    Ally.prototype.parse = function() {
      Ally.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return Ally;

  })(EventContentBase);
  EventContent.Item = (function(_super) {

    __extends(Item, _super);

    function Item() {
      return Item.__super__.constructor.apply(this, arguments);
    }

    Item.prototype.parse = function() {
      Item.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return Item;

  })(EventContentBase);
  EventContent.Skill = (function(_super) {

    __extends(Skill, _super);

    function Skill() {
      return Skill.__super__.constructor.apply(this, arguments);
    }

    Skill.prototype.parse = function() {
      Skill.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return Skill;

  })(EventContentBase);
  EventContent.Information = (function(_super) {

    __extends(Information, _super);

    function Information() {
      return Information.__super__.constructor.apply(this, arguments);
    }

    Information.prototype.parse = function() {
      Information.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return Information;

  })(EventContentBase);
  EventContent.Beast = (function(_super) {

    __extends(Beast, _super);

    function Beast() {
      return Beast.__super__.constructor.apply(this, arguments);
    }

    Beast.prototype.parse = function() {
      Beast.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return Beast;

  })(EventContentBase);
  EventContent.Money = (function(_super) {

    __extends(Money, _super);

    function Money() {
      return Money.__super__.constructor.apply(this, arguments);
    }

    Money.prototype.parse = function() {
      Money.__super__.parse.call(this);
      this.data.money = this.reader.readInt32();
      return this.data;
    };

    return Money;

  })(EventContentBase);
  EventContent.Achievement = (function(_super) {

    __extends(Achievement, _super);

    function Achievement() {
      return Achievement.__super__.constructor.apply(this, arguments);
    }

    Achievement.prototype.parse = function() {
      Achievement.__super__.parse.call(this);
      this.data.achievement = this.reader.readString();
      this.data.value = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return Achievement;

  })(EventContentBase);
  EventContent.AllyLoss = (function(_super) {

    __extends(AllyLoss, _super);

    function AllyLoss() {
      return AllyLoss.__super__.constructor.apply(this, arguments);
    }

    AllyLoss.prototype.parse = function() {
      AllyLoss.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return AllyLoss;

  })(EventContentBase);
  EventContent.ItemLoss = (function(_super) {

    __extends(ItemLoss, _super);

    function ItemLoss() {
      return ItemLoss.__super__.constructor.apply(this, arguments);
    }

    ItemLoss.prototype.parse = function() {
      ItemLoss.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return ItemLoss;

  })(EventContentBase);
  EventContent.SkillLoss = (function(_super) {

    __extends(SkillLoss, _super);

    function SkillLoss() {
      return SkillLoss.__super__.constructor.apply(this, arguments);
    }

    SkillLoss.prototype.parse = function() {
      SkillLoss.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return SkillLoss;

  })(EventContentBase);
  EventContent.InformationLoss = (function(_super) {

    __extends(InformationLoss, _super);

    function InformationLoss() {
      return InformationLoss.__super__.constructor.apply(this, arguments);
    }

    InformationLoss.prototype.parse = function() {
      InformationLoss.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return InformationLoss;

  })(EventContentBase);
  EventContent.BeastLoss = (function(_super) {

    __extends(BeastLoss, _super);

    function BeastLoss() {
      return BeastLoss.__super__.constructor.apply(this, arguments);
    }

    BeastLoss.prototype.parse = function() {
      BeastLoss.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      this.data.number = this.reader.readInt32();
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return BeastLoss;

  })(EventContentBase);
  EventContent.MoneyLoss = (function(_super) {

    __extends(MoneyLoss, _super);

    function MoneyLoss() {
      return MoneyLoss.__super__.constructor.apply(this, arguments);
    }

    MoneyLoss.prototype.parse = function() {
      MoneyLoss.__super__.parse.call(this);
      this.data.money = this.reader.readInt32();
      return this.data;
    };

    return MoneyLoss;

  })(EventContentBase);
  EventContent.AchievementLoss = (function(_super) {

    __extends(AchievementLoss, _super);

    function AchievementLoss() {
      return AchievementLoss.__super__.constructor.apply(this, arguments);
    }

    AchievementLoss.prototype.parse = function() {
      AchievementLoss.__super__.parse.call(this);
      this.data.achievement = this.reader.readString();
      this.reader.skip(4);
      this.data.targetScope = this.convertTargetScopeType(this.reader.readInt8());
      return this.data;
    };

    return AchievementLoss;

  })(EventContentBase);
  EventContent.CharacterMessage = (function(_super) {

    __extends(CharacterMessage, _super);

    function CharacterMessage() {
      return CharacterMessage.__super__.constructor.apply(this, arguments);
    }

    CharacterMessage.prototype.parse = function() {
      var i, messageLength;
      CharacterMessage.__super__.parse.call(this);
      this.data.target = this.convertTargetType(this.reader.readInt8());
      messageLength = this.reader.readInt32();
      this.data.messages = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= messageLength ? _i < messageLength : _i > messageLength; i = 0 <= messageLength ? ++_i : --_i) {
          _results.push(this.readMessage());
        }
        return _results;
      }).call(this);
      return this.data;
    };

    CharacterMessage.prototype.readMessage = function() {
      return {
        achievements: this.reader.readString().split('\n'),
        body: this.reader.readString()
      };
    };

    return CharacterMessage;

  })(EventContentBase);
  EventContent.StepUp = (function(_super) {

    __extends(StepUp, _super);

    function StepUp() {
      return StepUp.__super__.constructor.apply(this, arguments);
    }

    StepUp.prototype.parse = function() {
      StepUp.__super__.parse.call(this);
      this.data.steps = this.reader.readString();
      return this.data;
    };

    return StepUp;

  })(EventContentBase);
  EventContent.StepDown = (function(_super) {

    __extends(StepDown, _super);

    function StepDown() {
      return StepDown.__super__.constructor.apply(this, arguments);
    }

    StepDown.prototype.parse = function() {
      StepDown.__super__.parse.call(this);
      this.data.steps = this.reader.readString();
      return this.data;
    };

    return StepDown;

  })(EventContentBase);
  EventContent.FlagReverse = (function(_super) {

    __extends(FlagReverse, _super);

    function FlagReverse() {
      return FlagReverse.__super__.constructor.apply(this, arguments);
    }

    FlagReverse.prototype.parse = function() {
      FlagReverse.__super__.parse.call(this);
      this.data.flag = this.reader.readString();
      return this.data;
    };

    return FlagReverse;

  })(EventContentBase);
  EventContent.BranchByCurrentStep = (function(_super) {

    __extends(BranchByCurrentStep, _super);

    function BranchByCurrentStep() {
      return BranchByCurrentStep.__super__.constructor.apply(this, arguments);
    }

    BranchByCurrentStep.prototype.parse = function() {
      BranchByCurrentStep.__super__.parse.call(this);
      this.data.steps = this.reader.readString();
      this.data.value = this.reader.readInt32();
      return this.data;
    };

    return BranchByCurrentStep;

  })(EventContentBase);
  EventContent.TimePassage = (function(_super) {

    __extends(TimePassage, _super);

    function TimePassage() {
      return TimePassage.__super__.constructor.apply(this, arguments);
    }

    return TimePassage;

  })(EventContentBase);
  EventContent.BranchByLevel = (function(_super) {

    __extends(BranchByLevel, _super);

    function BranchByLevel() {
      return BranchByLevel.__super__.constructor.apply(this, arguments);
    }

    BranchByLevel.prototype.parse = function() {
      BranchByLevel.__super__.parse.call(this);
      this.data.useAverage = this.reader.readBollean();
      this.data.value = this.reader.readInt32();
      return this.data;
    };

    return BranchByLevel;

  })(EventContentBase);
  EventContent.BranchByState = (function(_super) {

    __extends(BranchByState, _super);

    function BranchByState() {
      return BranchByState.__super__.constructor.apply(this, arguments);
    }

    BranchByState.prototype.parse = function() {
      BranchByState.__super__.parse.call(this);
      this.data.state = this.convertCharacterSteteType(this.reader.readInt8());
      this.data.target = this.convertTargetType(this.reader.readInt8());
      return this.data;
    };

    return BranchByState;

  })(EventContentBase);
  EventContent.BranchByPartyNumber = (function(_super) {

    __extends(BranchByPartyNumber, _super);

    function BranchByPartyNumber() {
      return BranchByPartyNumber.__super__.constructor.apply(this, arguments);
    }

    BranchByPartyNumber.prototype.parse = function() {
      BranchByPartyNumber.__super__.parse.call(this);
      this.data.number = this.reader.readInt32();
      return this.data;
    };

    return BranchByPartyNumber;

  })(EventContentBase);
  EventContent.PartyShow = (function(_super) {

    __extends(PartyShow, _super);

    function PartyShow() {
      return PartyShow.__super__.constructor.apply(this, arguments);
    }

    return PartyShow;

  })(EventContentBase);
  EventContent.PartyHide = (function(_super) {

    __extends(PartyHide, _super);

    function PartyHide() {
      return PartyHide.__super__.constructor.apply(this, arguments);
    }

    return PartyHide;

  })(EventContentBase);
  EventContent.EffectBreak = (function(_super) {

    __extends(EffectBreak, _super);

    function EffectBreak() {
      return EffectBreak.__super__.constructor.apply(this, arguments);
    }

    return EffectBreak;

  })(EventContentBase);
  EventContent.StartCall = (function(_super) {

    __extends(StartCall, _super);

    function StartCall() {
      return StartCall.__super__.constructor.apply(this, arguments);
    }

    StartCall.prototype.parse = function() {
      StartCall.__super__.parse.call(this);
      this.data.start = this.reader.readString();
      return this.data;
    };

    return StartCall;

  })(EventContentBase);
  EventContent.PackegeLink = (function(_super) {

    __extends(PackegeLink, _super);

    function PackegeLink() {
      return PackegeLink.__super__.constructor.apply(this, arguments);
    }

    PackegeLink.prototype.parse = function() {
      PackegeLink.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return PackegeLink;

  })(EventContentBase);
  EventContent.PackegeCall = (function(_super) {

    __extends(PackegeCall, _super);

    function PackegeCall() {
      return PackegeCall.__super__.constructor.apply(this, arguments);
    }

    PackegeCall.prototype.parse = function() {
      PackegeCall.__super__.parse.call(this);
      this.data.id = this.reader.readInt32();
      return this.data;
    };

    return PackegeCall;

  })(EventContentBase);
  EventContent.BranchByScene = (function(_super) {

    __extends(BranchByScene, _super);

    function BranchByScene() {
      return BranchByScene.__super__.constructor.apply(this, arguments);
    }

    return BranchByScene;

  })(EventContentBase);
  EventContent.BranchByBattle = (function(_super) {

    __extends(BranchByBattle, _super);

    function BranchByBattle() {
      return BranchByBattle.__super__.constructor.apply(this, arguments);
    }

    return BranchByBattle;

  })(EventContentBase);
  EventContent.BranchByCompletedStamp = (function(_super) {

    __extends(BranchByCompletedStamp, _super);

    function BranchByCompletedStamp() {
      return BranchByCompletedStamp.__super__.constructor.apply(this, arguments);
    }

    BranchByCompletedStamp.prototype.parse = function() {
      BranchByCompletedStamp.__super__.parse.call(this);
      this.data.scenario = this.reader.readString();
      return this.data;
    };

    return BranchByCompletedStamp;

  })(EventContentBase);
  EventContent.CompletedStamp = (function(_super) {

    __extends(CompletedStamp, _super);

    function CompletedStamp() {
      return CompletedStamp.__super__.constructor.apply(this, arguments);
    }

    CompletedStamp.prototype.parse = function() {
      CompletedStamp.__super__.parse.call(this);
      this.data.scenario = this.reader.readString();
      return this.data;
    };

    return CompletedStamp;

  })(EventContentBase);
  EventContent.CompletedStampLoss = (function(_super) {

    __extends(CompletedStampLoss, _super);

    function CompletedStampLoss() {
      return CompletedStampLoss.__super__.constructor.apply(this, arguments);
    }

    CompletedStampLoss.prototype.parse = function() {
      CompletedStampLoss.__super__.parse.call(this);
      this.data.scenario = this.reader.readString();
      return this.data;
    };

    return CompletedStampLoss;

  })(EventContentBase);
  EventContent.BranchByGossip = (function(_super) {

    __extends(BranchByGossip, _super);

    function BranchByGossip() {
      return BranchByGossip.__super__.constructor.apply(this, arguments);
    }

    BranchByGossip.prototype.parse = function() {
      BranchByGossip.__super__.parse.call(this);
      this.data.gossip = this.reader.readString();
      return this.data;
    };

    return BranchByGossip;

  })(EventContentBase);
  EventContent.Gossip = (function(_super) {

    __extends(Gossip, _super);

    function Gossip() {
      return Gossip.__super__.constructor.apply(this, arguments);
    }

    Gossip.prototype.parse = function() {
      Gossip.__super__.parse.call(this);
      this.data.gossip = this.reader.readString();
      return this.data;
    };

    return Gossip;

  })(EventContentBase);
  EventContent.GossipLoss = (function(_super) {

    __extends(GossipLoss, _super);

    function GossipLoss() {
      return GossipLoss.__super__.constructor.apply(this, arguments);
    }

    GossipLoss.prototype.parse = function() {
      GossipLoss.__super__.parse.call(this);
      this.data.gossip = this.reader.readString();
      return this.data;
    };

    return GossipLoss;

  })(EventContentBase);
  EventContent.BranchByBattleNow = (function(_super) {

    __extends(BranchByBattleNow, _super);

    function BranchByBattleNow() {
      return BranchByBattleNow.__super__.constructor.apply(this, arguments);
    }

    return BranchByBattleNow;

  })(EventContentBase);
  EventContent.BackgroundRebuild = (function(_super) {

    __extends(BackgroundRebuild, _super);

    function BackgroundRebuild() {
      return BackgroundRebuild.__super__.constructor.apply(this, arguments);
    }

    return BackgroundRebuild;

  })(EventContentBase);
  EventContent.FlagCheck = (function(_super) {

    __extends(FlagCheck, _super);

    function FlagCheck() {
      return FlagCheck.__super__.constructor.apply(this, arguments);
    }

    FlagCheck.prototype.parse = function() {
      FlagCheck.__super__.parse.call(this);
      this.data.flag = this.reader.readString();
      return this.data;
    };

    return FlagCheck;

  })(EventContentBase);
  createEventContent = function(parent) {
    var content, type, upperCamelCasedType;
    type = parent.convertEventContentType(parent.reader.readInt8());
    parent.reader.seek(-1);
    upperCamelCasedType = type.replace(/^./, function(s) {
      return s.toUpperCase();
    });
    content = new EventContent[upperCamelCasedType](parent);
    return content;
  };
  exports.createEventContent = createEventContent;
  return exports;
});