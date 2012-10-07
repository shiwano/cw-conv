if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Base, Card, Effect, SimpleEvent;
  Effect = require('./effect').Effect;
  SimpleEvent = require('./event').SimpleEvent;
  Base = require('./base').Base;
  Card = (function(_super) {

    __extends(Card, _super);

    function Card() {
      return Card.__super__.constructor.apply(this, arguments);
    }

    Card.prototype.parse = function() {
      var effectsLength, eventsLength, i, keycode;
      this.data.type = this.convertScenarioDataType(this.reader.readInt8());
      this.data.image = this.reader.readImageAsDataURI();
      this.data.name = this.reader.readString();
      this.data.id = this.reader.readInt32() % 10000;
      this.data.description = this.reader.readString();
      this.data.physicalAptitude = this.convertPhysicalAptitudeType(this.reader.readInt32());
      this.data.mentalAptitude = this.convertMentalAptitudeType(this.reader.readInt32());
      this.data.ignoreSilence = !this.reader.readBoolean();
      this.data.targetAll = this.reader.readBoolean();
      this.data.target = this.convertCardTargetType(this.reader.readInt8());
      this.data.phenomenonType = this.convertEffectPhenomenonType(this.reader.readInt8());
      this.data.reactionType = this.convertEffectReactionType(this.reader.readInt8());
      this.data.successRate = this.reader.readInt32();
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
      this.data.evasionBonus = this.reader.readInt32();
      this.data.resistanceBonus = this.reader.readInt32();
      this.data.defenseBonus = this.reader.readInt32();
      this.data.soundBefore = this.reader.readString();
      this.data.soundAfter = this.reader.readString();
      this.data.keycodes = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i <= 4; i = ++_i) {
          _results.push(this.reader.readString());
        }
        return _results;
      }).call(this);
      this.data.keycodes = (function() {
        var _i, _len, _ref, _results;
        _ref = this.data.keycodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          keycode = _ref[_i];
          if (keycode) {
            _results.push(keycode);
          }
        }
        return _results;
      }).call(this);
      this.data.rarity = this.convertCardRarityType(this.reader.readInt8());
      this.data.scenario = this.reader.readString();
      this.data.author = this.reader.readString();
      eventsLength = this.reader.readInt32();
      this.data.events = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= eventsLength ? _i < eventsLength : _i > eventsLength; i = 0 <= eventsLength ? ++_i : --_i) {
          _results.push(new SimpleEvent(this).parse());
        }
        return _results;
      }).call(this);
      this.data.reserved = this.reader.readBoolean();
      if (this.isInnData) {
        this.reader.seek(4);
      }
      return this.data;
    };

    return Card;

  })(Base);
  exports.Card = Card;
  return exports;
});