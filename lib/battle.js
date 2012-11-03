(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var Base, Battle, EnemyCard, Event;
    Base = require('./base').Base;
    Event = require('./event').Event;
    Battle = (function(_super) {

      __extends(Battle, _super);

      function Battle() {
        return Battle.__super__.constructor.apply(this, arguments);
      }

      Battle.prototype.parse = function() {
        var enemyCardsLength, eventsLength, i;
        this.data.type = this.convertScenarioDataType(this.readInt8());
        this.seek(4);
        this.data.name = this.readString();
        this.data.id = this.readInt32() % 10000;
        eventsLength = this.readInt32();
        this.data.events = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= eventsLength ? _i < eventsLength : _i > eventsLength; i = 0 <= eventsLength ? ++_i : --_i) {
            _results.push(new Event(this).parse());
          }
          return _results;
        }).call(this);
        this.data.cardArrangement = this.convertCardArrangementType(this.readInt8());
        enemyCardsLength = this.readInt32();
        this.data.enemyCards = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= enemyCardsLength ? _i < enemyCardsLength : _i > enemyCardsLength; i = 0 <= enemyCardsLength ? ++_i : --_i) {
            _results.push(new EnemyCard(this).parse());
          }
          return _results;
        }).call(this);
        this.data.music = this.readString();
        return this.data;
      };

      return Battle;

    })(Base);
    EnemyCard = (function(_super) {

      __extends(EnemyCard, _super);

      function EnemyCard() {
        return EnemyCard.__super__.constructor.apply(this, arguments);
      }

      EnemyCard.prototype.parse = function() {
        var eventsLength, i;
        this.data.characterId = this.readInt32();
        eventsLength = this.readInt32();
        this.data.events = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= eventsLength ? _i < eventsLength : _i > eventsLength; i = 0 <= eventsLength ? ++_i : --_i) {
            _results.push(new Event(this).parse());
          }
          return _results;
        }).call(this);
        this.data.flag = this.readString();
        this.data.scale = this.readInt32();
        this.data.left = this.readInt32();
        this.data.top = this.readInt32();
        this.data.escapable = this.readBoolean();
        return this.data;
      };

      return EnemyCard;

    })(Base);
    exports.Battle = Battle;
    return exports;
  });

}).call(this);
