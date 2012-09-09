var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function(require, exports, module) {
  var Base;
  Base = (function() {

    function Base(reader, isInnData) {
      if (isInnData == null) {
        isInnData = false;
      }
      this.isInnData = isInnData;
      this.reader = reader;
      this.data = {};
    }

    Base.prototype.toJSON = function() {
      return JSON.stringify(this.data);
    };

    Base.prototype.convertEventContentType = function(i) {
      switch (i) {
        case 0:
          return 'start';
        case 1:
          return 'startLink';
        case 2:
          return 'battle';
        case 3:
          return 'scenarioEnd';
        case 4:
          return 'gameOver';
        case 5:
          return 'scene';
        case 6:
          return 'message';
        case 7:
          return 'music';
        case 8:
          return 'background';
        case 9:
          return 'sound';
        case 10:
          return 'wait';
        case 11:
          return 'effect';
        case 12:
          return 'branchByMemberSelect';
        case 13:
          return 'branchByAbility';
        case 14:
          return 'branchByRandom';
        case 15:
          return 'branchByFlag';
        case 16:
          return 'flag';
        case 17:
          return 'branchBySteps';
        case 18:
          return 'steps';
        case 19:
          return 'branchByCast';
        case 20:
          return 'branchByItem';
        case 21:
          return 'branchBySkill';
        case 22:
          return 'branchByInfomation';
        case 23:
          return 'branchByBeast';
        case 24:
          return 'branchByMoney';
        case 25:
          return 'branchByAchievement';
        case 26:
          return 'cast';
        case 27:
          return 'item';
        case 28:
          return 'skill';
        case 29:
          return 'information';
        case 30:
          return 'beast';
        case 31:
          return 'money';
        case 32:
          return 'achievement';
        case 33:
          return 'castLoss';
        case 34:
          return 'itemLoss';
        case 35:
          return 'skillLoss';
        case 36:
          return 'informationLoss';
        case 37:
          return 'beastLoss';
        case 38:
          return 'moneyLoss';
        case 39:
          return 'achievementLoss';
        case 40:
          return 'characterMessage';
        case 41:
          return 'stepUp';
        case 42:
          return 'stepDown';
        case 43:
          return 'flagReverse';
        case 44:
          return 'branchByCurrentStep';
        case 45:
          return 'timePassage';
        case 46:
          return 'branchByLevel';
        case 47:
          return 'branchByState';
        case 48:
          return 'branchByPartyNumber';
        case 49:
          return 'partyShow';
        case 50:
          return 'partyHide';
        case 51:
          return 'effectBreak';
        case 52:
          return 'startCall';
        case 53:
          return 'packageLink';
        case 54:
          return 'packageCall';
        case 55:
          return 'branchByScene';
        case 56:
          return 'branchByBattle';
        case 57:
          return 'branchByCompletedStamp';
        case 58:
          return 'completedStamp';
        case 59:
          return 'completedStampLoss';
        case 60:
          return 'branchByGossip';
        case 61:
          return 'gossip';
        case 62:
          return 'gossipLoss';
        case 63:
          return 'branchByBattleNow';
        case 64:
          return 'backgroundRebuild';
        case 65:
          return 'flagCheck';
        default:
          throw Error("Unknown event content type: " + i);
      }
    };

    Base.prototype.convertTargetType = function(i) {
      switch (i) {
        case 0:
          return 'selected';
        case 1:
          return 'random';
        case 2:
          return 'unselected';
        case 3:
          return 'selectedIgnoreSleep';
        case 4:
          return 'randomIgnoreSleep';
        case 5:
          return 'partyIgnoreSleep';
        case 6:
          return 'party';
        default:
          throw Error("Unknown target type: " + i);
      }
    };

    Base.prototype.convertTargetScopeType = function(i) {
      switch (i) {
        case 0:
          return 'selected';
        case 1:
          return 'random';
        case 2:
          return 'party';
        case 3:
          return 'backpack';
        case 4:
          return 'partyAndBackpack';
        case 5:
          return 'field';
        default:
          throw Error("Unknown target scope type: " + i);
      }
    };

    Base.prototype.convertCardArrangementType = function(i) {
      switch (i) {
        case 0:
          return 'auto';
        case 1:
          return 'custom';
        default:
          throw Error("Unknown card arrangement type: " + i);
      }
    };

    Base.prototype.convertCharacterStatusType = function(i) {
      switch (i) {
        case 0:
          return 'active';
        case 1:
          return 'inactive';
        case 2:
          return 'alive';
        case 3:
          return 'dead';
        case 4:
          return 'fine';
        case 5:
          return 'injured';
        case 6:
          return 'heavyInjured';
        case 7:
          return 'unconscious';
        case 8:
          return 'poison';
        case 9:
          return 'sleep';
        case 10:
          return 'bind';
        case 11:
          return 'paralyzed';
        default:
          throw Error("Unknown character state type: " + i);
      }
    };

    Base.prototype.convertEffectElement = function(i) {
      switch (i) {
        case 0:
          return 'non';
        case 1:
          return 'body';
        case 2:
          return 'mind';
        case 3:
          return 'holy';
        case 4:
          return 'magic';
        case 5:
          return 'fire';
        case 6:
          return 'cold';
        default:
          throw Error("Unknown effect element type: " + i);
      }
    };

    Base.prototype.convertEffectType = function(self, categoryType, effectType) {
      switch (categoryType) {
        case 0:
          switch (effectType) {
            case 0:
              return 'heal';
            case 1:
              return 'damage';
            case 2:
              return 'absorb';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 1:
          switch (effectType) {
            case 0:
              return 'paralyze';
            case 1:
              return 'disParalyze';
            case 2:
              return 'poison';
            case 3:
              return 'disPoison';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 2:
          switch (effectType) {
            case 0:
              return 'recoverSkillPoint';
            case 1:
              return 'loseSkillPoint';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 3:
          switch (effectType) {
            case 0:
              return 'sleep';
            case 1:
              return 'confuse';
            case 2:
              return 'overheat';
            case 3:
              return 'encourage';
            case 4:
              return 'panic';
            case 5:
              return 'relaxMind';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 4:
          switch (effectType) {
            case 0:
              return 'bind';
            case 1:
              return 'disBind';
            case 2:
              return 'silence';
            case 3:
              return 'disSilence';
            case 4:
              return 'reveal';
            case 5:
              return 'conceal';
            case 6:
              return 'enableMagicproof';
            case 7:
              return 'disableMagicproof';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 5:
          switch (effectType) {
            case 0:
              return 'enhanceActionLevel';
            case 1:
              return 'enhanceEvasion';
            case 2:
              return 'enhanceResistance';
            case 3:
              return 'enhanceDefense';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 6:
          switch (effectType) {
            case 0:
              return 'vanishTarget';
            case 1:
              return 'vanishCards';
            case 2:
              return 'vanishBeasts';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 7:
          switch (effectType) {
            case 0:
              return 'dealAttackCard';
            case 1:
              return 'dealPowerfulAttackCard';
            case 2:
              return 'dealCriticalAttackCard';
            case 3:
              return 'dealFeintCard';
            case 4:
              return 'dealDefenseCard';
            case 5:
              return 'dealDistanceCard';
            case 6:
              return 'dealConfuseCard';
            case 7:
              return 'dealSkillCard';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        case 8:
          switch (effectType) {
            case 0:
              return 'summonBeast';
            default:
              throw Error("Unknown effect type: " + categoryType + ", " + effectType);
          }
          break;
        default:
          throw Error("Unknown effect type: " + categoryType + ", " + effectType);
      }
    };

    Base.prototype.convertEffectDamageType = function(i) {
      switch (i) {
        case 0:
          return 'levelRatio';
        case 1:
          return 'default';
        case 2:
          return 'max';
        default:
          throw Error("Unknown effect damage type: " + i);
      }
    };

    Base.prototype.convertCardEffectElementType = function(i) {
      switch (i) {
        case 0:
          return 'physical';
        case 1:
          return 'magical';
        case 2:
          return 'magicalPhysical';
        case 3:
          return 'physicalMagical';
        case 4:
          return 'non';
        default:
          throw Error("Unknown card effect element type: " + i);
      }
    };

    Base.prototype.convertCardEffectResponseType = function(i) {
      switch (i) {
        case 0:
          return 'evasion';
        case 1:
          return 'resistance';
        case 2:
          return 'ineluctability';
        default:
          throw Error("Unknown card response type: " + i);
      }
    };

    Base.prototype.convertCardEffectAnimationType = function(i) {
      switch (i) {
        case 0:
          return 'none';
        case 1:
          return 'turnover';
        case 2:
          return 'lateralVibration';
        case 3:
          return 'longitudinalVibration';
        default:
          throw Error("Unknown card effect animation type: " + i);
      }
    };

    Base.prototype.convertCardPhysicalAptitudeType = function(i) {
      switch (i) {
        case 0:
          return 'dex';
        case 1:
          return 'agl';
        case 2:
          return 'int';
        case 3:
          return 'str';
        case 4:
          return 'vit';
        case 5:
          return 'min';
        default:
          throw Error("Unknown card physical aptitude type: " + i);
      }
    };

    Base.prototype.convertCardMentalAptitudeType = function(i) {
      switch (i) {
        case 1:
          return 'aggressive';
        case -1:
          return 'unaggressive';
        case 2:
          return 'cheerful';
        case -2:
          return 'uncheerful';
        case 3:
          return 'brave';
        case -3:
          return 'unbrave';
        case 4:
          return 'cautious';
        case -4:
          return 'uncautious';
        case 5:
          return 'trickish';
        case -5:
          return 'untrickish';
        default:
          throw Error("Unknown card mental aptitude type: " + i);
      }
    };

    Base.prototype.convertCardTargetType = function(i) {
      switch (i) {
        case 0:
          return 'none';
        case 1:
          return 'user';
        case 2:
          return 'party';
        case 3:
          return 'enemies';
        case 4:
          return 'partyAndEnemies';
        default:
          throw Error("Unknown card target type: " + i);
      }
    };

    Base.prototype.convertCardRarityType = function(i) {
      switch (i) {
        case 0:
          return "common";
        case 1:
          return 'rare';
        case 2:
          return 'premium';
        default:
          throw Error("Unknown card rarity type: " + i);
      }
    };

    Base.prototype.convertCharacterMentalityType = function(i) {
      switch (i) {
        case 0:
          return 'normal';
        case 1:
          return 'panic';
        case 2:
          return 'brave';
        case 3:
          return 'overheat';
        case 4:
          return 'confusion';
        case 5:
          return 'sleep';
        default:
          throw Error("Unknown character mentarity type: " + i);
      }
    };

    Base.prototype.convertInnType = function(i) {
      switch (i) {
        case 1:
          return 'normal';
        case 2:
          return 'debug';
        default:
          throw Error("Unknown inn type: " + i);
      }
    };

    Base.prototype.convertInnSummarySettingType = function(i) {
      switch (i) {
        case 0:
          return 'hideHiddenAndCompletedScenarios';
        case 1:
          return "hideHiddenScenarios";
        case 2:
          return "showAllScenarios";
        case 3:
          return "showSuitableScenarios";
        default:
          throw Error("Unknown inn summary setting type: " + i);
      }
    };

    Base.prototype.convertInnBackgroundSettingType = function(i) {
      switch (i) {
        case 0:
          return 'noAnimation';
        case 1:
          return 'reedShape';
        case 2:
          return 'colorShades';
        case 3:
          return 'replaceDots';
        default:
          throw Error("Unknown inn background setting type: " + i);
      }
    };

    return Base;

  })();
  exports.Base = Base;
  return exports;
});
