(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var BackgroundImage, Base, Event, MenuCard, Scene;
    Base = require('./base').Base;
    Event = require('./event').Event;
    BackgroundImage = require('./background_image').BackgroundImage;
    Scene = (function(_super) {

      __extends(Scene, _super);

      function Scene() {
        return Scene.__super__.constructor.apply(this, arguments);
      }

      Scene.prototype.parse = function() {
        var bgsLength, eventsLength, i, menuCardsLength;
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
        menuCardsLength = this.readInt32();
        this.data.menuCards = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= menuCardsLength ? _i < menuCardsLength : _i > menuCardsLength; i = 0 <= menuCardsLength ? ++_i : --_i) {
            _results.push(new MenuCard(this).parse());
          }
          return _results;
        }).call(this);
        bgsLength = this.readInt32();
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

      return Scene;

    })(Base);
    MenuCard = (function(_super) {

      __extends(MenuCard, _super);

      function MenuCard() {
        return MenuCard.__super__.constructor.apply(this, arguments);
      }

      MenuCard.prototype.parse = function() {
        var eventsLength, i, imagePath;
        this.seek(1);
        this.data.image = this.readImageAsDataURI();
        this.data.name = this.readString();
        this.seek(4);
        this.data.description = this.readString();
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
        imagePath = this.readString();
        if (!this.data.image) {
          this.data.image = imagePath;
        }
        return this.data;
      };

      return MenuCard;

    })(Base);
    exports.Scene = Scene;
    return exports;
  });

}).call(this);
