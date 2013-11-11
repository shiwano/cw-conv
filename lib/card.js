(function() {
  var Base, Card, Effect, SimpleEvent, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Effect = require('./effect').Effect;

  SimpleEvent = require('./event').SimpleEvent;

  Base = require('./base').Base;

  Card = (function(_super) {
    __extends(Card, _super);

    function Card() {
      _ref = Card.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Card.prototype.parse = function() {
      var i, keycode,
        _this = this;

      this.data.type = this.convertScenarioDataType(this.readInt8());
      this.data.image = this.readImageAsDataURI();
      this.data.name = this.readString();
      this.data.id = this.readInt32() % 10000;
      this.data.description = this.readString();
      this.data.abilityAptitude = this.convertPhysicalAptitudeType(this.readInt32());
      this.data.personalAptitude = this.convertMentalAptitudeType(this.readInt32());
      this.data.ignoreSilence = !this.readBoolean();
      this.data.targetAll = this.readBoolean();
      this.data.target = this.convertCardTargetType(this.readInt8());
      this.data.phenomenonType = this.convertEffectPhenomenonType(this.readInt8());
      this.data.reactionType = this.convertEffectReactionType(this.readInt8());
      this.data.successRate = this.readInt32();
      this.data.animationType = this.convertEffectAnimationType(this.readInt8());
      this.data.effects = this.readArray(function() {
        return new Effect(_this).parse();
      });
      this.data.evasionBonus = this.readInt32();
      this.data.resistanceBonus = this.readInt32();
      this.data.defenseBonus = this.readInt32();
      this.data.soundBefore = this.readString();
      this.data.soundAfter = this.readString();
      this.data.keycodes = (function() {
        var _i, _results;

        _results = [];
        for (i = _i = 0; _i <= 4; i = ++_i) {
          _results.push(this.readString());
        }
        return _results;
      }).call(this);
      this.data.keycodes = (function() {
        var _i, _len, _ref1, _results;

        _ref1 = this.data.keycodes;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          keycode = _ref1[_i];
          if (keycode) {
            _results.push(keycode);
          }
        }
        return _results;
      }).call(this);
      this.data.rarity = this.convertCardRarityType(this.readInt8());
      this.data.scenario = this.readString();
      this.data.author = this.readString();
      this.data.events = this.readArray(function() {
        return new SimpleEvent(_this).parse();
      });
      this.data.reserved = this.readBoolean();
      if (this.isInnData) {
        this.seek(4);
      }
      return this.data;
    };

    return Card;

  })(Base);

  exports.Card = Card;

}).call(this);
