(function() {
  var BackgroundImage, Base, EventElement, EventElementBase, createEventElement, utils, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref3, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref4, _ref40, _ref41, _ref42, _ref43, _ref44, _ref45, _ref46, _ref47, _ref48, _ref49, _ref5, _ref50, _ref51, _ref52, _ref53, _ref54, _ref55, _ref56, _ref57, _ref58, _ref59, _ref6, _ref60, _ref61, _ref62, _ref63, _ref64, _ref65, _ref66, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('./utils');

  Base = require('./base').Base;

  BackgroundImage = require('./background_image').BackgroundImage;

  EventElement = {};

  EventElementBase = (function(_super) {
    __extends(EventElementBase, _super);

    function EventElementBase() {
      _ref = EventElementBase.__super__.constructor.apply(this, arguments);
      return _ref;
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
      _ref1 = Start.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return Start;

  })(EventElementBase);

  EventElement.StartLink = (function(_super) {
    __extends(StartLink, _super);

    function StartLink() {
      _ref2 = StartLink.__super__.constructor.apply(this, arguments);
      return _ref2;
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
      _ref3 = Battle.__super__.constructor.apply(this, arguments);
      return _ref3;
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
      _ref4 = ScenarioEnd.__super__.constructor.apply(this, arguments);
      return _ref4;
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
      _ref5 = GameOver.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    return GameOver;

  })(EventElementBase);

  EventElement.Scene = (function(_super) {
    __extends(Scene, _super);

    function Scene() {
      _ref6 = Scene.__super__.constructor.apply(this, arguments);
      return _ref6;
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
      _ref7 = Message.__super__.constructor.apply(this, arguments);
      return _ref7;
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
      _ref8 = Music.__super__.constructor.apply(this, arguments);
      return _ref8;
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
      _ref9 = Background.__super__.constructor.apply(this, arguments);
      return _ref9;
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
      _ref10 = Sound.__super__.constructor.apply(this, arguments);
      return _ref10;
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
      _ref11 = Wait.__super__.constructor.apply(this, arguments);
      return _ref11;
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
      _ref12 = Effect.__super__.constructor.apply(this, arguments);
      return _ref12;
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
      _ref13 = BranchByMemberSelect.__super__.constructor.apply(this, arguments);
      return _ref13;
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
      _ref14 = BranchByAbility.__super__.constructor.apply(this, arguments);
      return _ref14;
    }

    BranchByAbility.prototype.parse = function() {
      BranchByAbility.__super__.parse.apply(this, arguments);
      this.data.value = this.readInt32();
      this.data.target = this.convertTargetType(this.readInt8());
      this.data.abilityAptitude = this.convertPhysicalAptitudeType(this.readInt32());
      this.data.personalAptitude = this.convertMentalAptitudeType(this.readInt32());
      return this.data;
    };

    return BranchByAbility;

  })(EventElementBase);

  EventElement.BranchByRandom = (function(_super) {
    __extends(BranchByRandom, _super);

    function BranchByRandom() {
      _ref15 = BranchByRandom.__super__.constructor.apply(this, arguments);
      return _ref15;
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
      _ref16 = BranchByFlag.__super__.constructor.apply(this, arguments);
      return _ref16;
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
      _ref17 = Flag.__super__.constructor.apply(this, arguments);
      return _ref17;
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
      _ref18 = BranchBySteps.__super__.constructor.apply(this, arguments);
      return _ref18;
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
      _ref19 = Steps.__super__.constructor.apply(this, arguments);
      return _ref19;
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
      _ref20 = BranchByFriend.__super__.constructor.apply(this, arguments);
      return _ref20;
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
      _ref21 = BranchByItem.__super__.constructor.apply(this, arguments);
      return _ref21;
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
      _ref22 = BranchBySkill.__super__.constructor.apply(this, arguments);
      return _ref22;
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
      _ref23 = BranchByInformation.__super__.constructor.apply(this, arguments);
      return _ref23;
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
      _ref24 = BranchByBeast.__super__.constructor.apply(this, arguments);
      return _ref24;
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
      _ref25 = BranchByMoney.__super__.constructor.apply(this, arguments);
      return _ref25;
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
      _ref26 = BranchByAchievement.__super__.constructor.apply(this, arguments);
      return _ref26;
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
      _ref27 = Friend.__super__.constructor.apply(this, arguments);
      return _ref27;
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
      _ref28 = Item.__super__.constructor.apply(this, arguments);
      return _ref28;
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
      _ref29 = Skill.__super__.constructor.apply(this, arguments);
      return _ref29;
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
      _ref30 = Information.__super__.constructor.apply(this, arguments);
      return _ref30;
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
      _ref31 = Beast.__super__.constructor.apply(this, arguments);
      return _ref31;
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
      _ref32 = Money.__super__.constructor.apply(this, arguments);
      return _ref32;
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
      _ref33 = Achievement.__super__.constructor.apply(this, arguments);
      return _ref33;
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
      _ref34 = FriendLoss.__super__.constructor.apply(this, arguments);
      return _ref34;
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
      _ref35 = ItemLoss.__super__.constructor.apply(this, arguments);
      return _ref35;
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
      _ref36 = SkillLoss.__super__.constructor.apply(this, arguments);
      return _ref36;
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
      _ref37 = InformationLoss.__super__.constructor.apply(this, arguments);
      return _ref37;
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
      _ref38 = BeastLoss.__super__.constructor.apply(this, arguments);
      return _ref38;
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
      _ref39 = MoneyLoss.__super__.constructor.apply(this, arguments);
      return _ref39;
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
      _ref40 = AchievementLoss.__super__.constructor.apply(this, arguments);
      return _ref40;
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
      _ref41 = CharacterMessage.__super__.constructor.apply(this, arguments);
      return _ref41;
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
      _ref42 = StepUp.__super__.constructor.apply(this, arguments);
      return _ref42;
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
      _ref43 = StepDown.__super__.constructor.apply(this, arguments);
      return _ref43;
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
      _ref44 = FlagReverse.__super__.constructor.apply(this, arguments);
      return _ref44;
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
      _ref45 = BranchByCurrentStep.__super__.constructor.apply(this, arguments);
      return _ref45;
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
      _ref46 = TimePassage.__super__.constructor.apply(this, arguments);
      return _ref46;
    }

    return TimePassage;

  })(EventElementBase);

  EventElement.BranchByLevel = (function(_super) {
    __extends(BranchByLevel, _super);

    function BranchByLevel() {
      _ref47 = BranchByLevel.__super__.constructor.apply(this, arguments);
      return _ref47;
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
      _ref48 = BranchByCharacterState.__super__.constructor.apply(this, arguments);
      return _ref48;
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
      _ref49 = BranchByPartyNumber.__super__.constructor.apply(this, arguments);
      return _ref49;
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
      _ref50 = PartyShow.__super__.constructor.apply(this, arguments);
      return _ref50;
    }

    return PartyShow;

  })(EventElementBase);

  EventElement.PartyHide = (function(_super) {
    __extends(PartyHide, _super);

    function PartyHide() {
      _ref51 = PartyHide.__super__.constructor.apply(this, arguments);
      return _ref51;
    }

    return PartyHide;

  })(EventElementBase);

  EventElement.EffectBreak = (function(_super) {
    __extends(EffectBreak, _super);

    function EffectBreak() {
      _ref52 = EffectBreak.__super__.constructor.apply(this, arguments);
      return _ref52;
    }

    return EffectBreak;

  })(EventElementBase);

  EventElement.StartCall = (function(_super) {
    __extends(StartCall, _super);

    function StartCall() {
      _ref53 = StartCall.__super__.constructor.apply(this, arguments);
      return _ref53;
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
      _ref54 = PackageLink.__super__.constructor.apply(this, arguments);
      return _ref54;
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
      _ref55 = PackageCall.__super__.constructor.apply(this, arguments);
      return _ref55;
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
      _ref56 = BranchByScene.__super__.constructor.apply(this, arguments);
      return _ref56;
    }

    return BranchByScene;

  })(EventElementBase);

  EventElement.BranchByBattle = (function(_super) {
    __extends(BranchByBattle, _super);

    function BranchByBattle() {
      _ref57 = BranchByBattle.__super__.constructor.apply(this, arguments);
      return _ref57;
    }

    return BranchByBattle;

  })(EventElementBase);

  EventElement.BranchByCompletedStamp = (function(_super) {
    __extends(BranchByCompletedStamp, _super);

    function BranchByCompletedStamp() {
      _ref58 = BranchByCompletedStamp.__super__.constructor.apply(this, arguments);
      return _ref58;
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
      _ref59 = CompletedStamp.__super__.constructor.apply(this, arguments);
      return _ref59;
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
      _ref60 = CompletedStampLoss.__super__.constructor.apply(this, arguments);
      return _ref60;
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
      _ref61 = BranchByGossip.__super__.constructor.apply(this, arguments);
      return _ref61;
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
      _ref62 = Gossip.__super__.constructor.apply(this, arguments);
      return _ref62;
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
      _ref63 = GossipLoss.__super__.constructor.apply(this, arguments);
      return _ref63;
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
      _ref64 = BranchByBattleNow.__super__.constructor.apply(this, arguments);
      return _ref64;
    }

    return BranchByBattleNow;

  })(EventElementBase);

  EventElement.BackgroundRebuild = (function(_super) {
    __extends(BackgroundRebuild, _super);

    function BackgroundRebuild() {
      _ref65 = BackgroundRebuild.__super__.constructor.apply(this, arguments);
      return _ref65;
    }

    return BackgroundRebuild;

  })(EventElementBase);

  EventElement.FlagCheck = (function(_super) {
    __extends(FlagCheck, _super);

    function FlagCheck() {
      _ref66 = FlagCheck.__super__.constructor.apply(this, arguments);
      return _ref66;
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

}).call(this);
