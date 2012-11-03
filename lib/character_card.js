(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var Achievement, Base, BeastCard, CharacterCard, ItemCard, SkillCard;
    ItemCard = require('./item_card').ItemCard;
    SkillCard = require('./skill_card').SkillCard;
    BeastCard = require('./beast_card').BeastCard;
    Base = require('./base').Base;
    CharacterCard = (function(_super) {

      __extends(CharacterCard, _super);

      function CharacterCard() {
        return CharacterCard.__super__.constructor.apply(this, arguments);
      }

      CharacterCard.prototype.parse = function() {
        var achievementLength, beastLength, i, itemLength, skillLength;
        this.data.type = this.convertScenarioDataType(this.readInt8());
        this.data.image = this.readImageAsDataURI();
        this.data.name = this.readString();
        this.data.id = this.readInt32() % 10000;
        this.data.physicsproof = this.readBoolean();
        this.data.magicproof = this.readBoolean();
        this.data.bodyproof = this.readBoolean();
        this.data.mindproof = this.readBoolean();
        this.data.holyproof = this.readBoolean();
        this.data.spellproof = this.readBoolean();
        this.data.fireproof = this.readBoolean();
        this.data.iceproof = this.readBoolean();
        this.data.fireWeakness = this.readBoolean();
        this.data.iceWeakness = this.readBoolean();
        this.data.level = this.readInt32();
        this.data.money = this.readInt32();
        this.data.description = this.readString();
        this.data.life = this.readInt32();
        this.data.maxLife = this.readInt32();
        this.data.paralysisCounter = this.readInt32();
        this.data.poisonCounter = this.readInt32();
        this.data.evasion = this.readInt32();
        this.data.resistance = this.readInt32();
        this.data.defense = this.readInt32();
        this.data.dex = this.readInt32();
        this.data.agl = this.readInt32();
        this.data.int = this.readInt32();
        this.data.str = this.readInt32();
        this.data.vit = this.readInt32();
        this.data.min = this.readInt32();
        this.data.aggressiveness = this.readInt32();
        this.data.cheerfulness = this.readInt32();
        this.data.braveness = this.readInt32();
        this.data.carefulness = this.readInt32();
        this.data.craftiness = this.readInt32();
        this.data.mentality = this.convertCharacterMentalityType(this.readInt8());
        this.data.mentalityCounter = this.readInt32();
        this.data.bindCounter = this.readInt32();
        this.data.silenceCounter = this.readInt32();
        this.data.revealCounter = this.readInt32();
        this.data.magicproofCounter = this.readInt32();
        this.data.actionLevelBonus = this.readInt32();
        this.data.actionLevelBonusCounter = this.readInt32();
        this.data.evasionBonus = this.readInt32();
        this.data.evasionBonusCounter = this.readInt32();
        this.data.resistanceBonus = this.readInt32();
        this.data.resistanceBonusCounter = this.readInt32();
        this.data.defenseBonus = this.readInt32();
        this.data.defenseBonusCounter = this.readInt32();
        itemLength = this.readInt32();
        this.data.itemCards = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= itemLength ? _i < itemLength : _i > itemLength; i = 0 <= itemLength ? ++_i : --_i) {
            _results.push(new ItemCard(this).parse());
          }
          return _results;
        }).call(this);
        skillLength = this.readInt32();
        this.data.skillCards = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= skillLength ? _i < skillLength : _i > skillLength; i = 0 <= skillLength ? ++_i : --_i) {
            _results.push(new SkillCard(this).parse());
          }
          return _results;
        }).call(this);
        beastLength = this.readInt32();
        this.data.beastCards = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= beastLength ? _i < beastLength : _i > beastLength; i = 0 <= beastLength ? ++_i : --_i) {
            _results.push(new BeastCard(this).parse());
          }
          return _results;
        }).call(this);
        achievementLength = this.readInt32();
        this.data.achievements = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= achievementLength ? _i < achievementLength : _i > achievementLength; i = 0 <= achievementLength ? ++_i : --_i) {
            _results.push(new Achievement(this).parse());
          }
          return _results;
        }).call(this);
        return this.data;
      };

      return CharacterCard;

    })(Base);
    Achievement = (function(_super) {

      __extends(Achievement, _super);

      function Achievement() {
        return Achievement.__super__.constructor.apply(this, arguments);
      }

      Achievement.prototype.parse = function() {
        this.data.name = this.readString();
        this.data.score = this.readInt32();
        return this.data;
      };

      return Achievement;

    })(Base);
    exports.CharacterCard = CharacterCard;
    return exports;
  });

}).call(this);
