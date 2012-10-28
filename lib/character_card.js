if (typeof define !== 'function') {
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
      this.data.type = this.convertScenarioDataType(this.reader.readInt8());
      this.data.image = this.reader.readImageAsDataURI();
      this.data.name = this.reader.readString();
      this.data.id = this.reader.readInt32() % 10000;
      this.data.physicsproof = this.reader.readBoolean();
      this.data.magicproof = this.reader.readBoolean();
      this.data.bodyproof = this.reader.readBoolean();
      this.data.mindproof = this.reader.readBoolean();
      this.data.holyproof = this.reader.readBoolean();
      this.data.spellproof = this.reader.readBoolean();
      this.data.fireproof = this.reader.readBoolean();
      this.data.iceproof = this.reader.readBoolean();
      this.data.fireWeakness = this.reader.readBoolean();
      this.data.iceWeakness = this.reader.readBoolean();
      this.data.level = this.reader.readInt32();
      this.data.money = this.reader.readInt32();
      this.data.description = this.reader.readString();
      this.data.life = this.reader.readInt32();
      this.data.maxLife = this.reader.readInt32();
      this.data.paralysisCounter = this.reader.readInt32();
      this.data.poisonCounter = this.reader.readInt32();
      this.data.evasion = this.reader.readInt32();
      this.data.resistance = this.reader.readInt32();
      this.data.defense = this.reader.readInt32();
      this.data.dex = this.reader.readInt32();
      this.data.agl = this.reader.readInt32();
      this.data.int = this.reader.readInt32();
      this.data.str = this.reader.readInt32();
      this.data.vit = this.reader.readInt32();
      this.data.min = this.reader.readInt32();
      this.data.aggressiveness = this.reader.readInt32();
      this.data.cheerfulness = this.reader.readInt32();
      this.data.braveness = this.reader.readInt32();
      this.data.carefulness = this.reader.readInt32();
      this.data.craftiness = this.reader.readInt32();
      this.data.mentality = this.convertCharacterMentalityType(this.reader.readInt8());
      this.data.mentalityCounter = this.reader.readInt32();
      this.data.bindCounter = this.reader.readInt32();
      this.data.silenceCounter = this.reader.readInt32();
      this.data.revealCounter = this.reader.readInt32();
      this.data.magicproofCounter = this.reader.readInt32();
      this.data.actionLevelBonus = this.reader.readInt32();
      this.data.actionLevelBonusCounter = this.reader.readInt32();
      this.data.evasionBonus = this.reader.readInt32();
      this.data.evasionBonusCounter = this.reader.readInt32();
      this.data.resistanceBonus = this.reader.readInt32();
      this.data.resistanceBonusCounter = this.reader.readInt32();
      this.data.defenseBonus = this.reader.readInt32();
      this.data.defenseBonusCounter = this.reader.readInt32();
      itemLength = this.reader.readInt32();
      this.data.itemCards = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= itemLength ? _i < itemLength : _i > itemLength; i = 0 <= itemLength ? ++_i : --_i) {
          _results.push(new ItemCard(this).parse());
        }
        return _results;
      }).call(this);
      skillLength = this.reader.readInt32();
      this.data.skillCards = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= skillLength ? _i < skillLength : _i > skillLength; i = 0 <= skillLength ? ++_i : --_i) {
          _results.push(new SkillCard(this).parse());
        }
        return _results;
      }).call(this);
      beastLength = this.reader.readInt32();
      this.data.beastCards = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= beastLength ? _i < beastLength : _i > beastLength; i = 0 <= beastLength ? ++_i : --_i) {
          _results.push(new BeastCard(this).parse());
        }
        return _results;
      }).call(this);
      achievementLength = this.reader.readInt32();
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
      this.data.name = this.reader.readString();
      this.data.score = this.reader.readInt32();
      return this.data;
    };

    return Achievement;

  })(Base);
  exports.CharacterCard = CharacterCard;
  return exports;
});