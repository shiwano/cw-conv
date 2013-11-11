(function() {
  var BackgroundImage, Base, Event, MenuCard, Scene, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base').Base;

  Event = require('./event').Event;

  BackgroundImage = require('./background_image').BackgroundImage;

  Scene = (function(_super) {
    __extends(Scene, _super);

    function Scene() {
      _ref = Scene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Scene.prototype.parse = function() {
      var _this = this;

      this.data.type = this.convertScenarioDataType(this.readInt8());
      this.seek(4);
      this.data.name = this.readString();
      this.data.id = this.readInt32() % 10000;
      this.data.events = this.readArray(function() {
        return new Event(_this).parse();
      });
      this.data.menuCardArrangementType = this.convertMenuCardArrangementType(this.readInt8());
      this.data.menuCards = this.readArray(function() {
        return new MenuCard(_this).parse();
      });
      this.data.backgrounds = this.readArray(function() {
        return new BackgroundImage(_this).parse();
      });
      return this.data;
    };

    return Scene;

  })(Base);

  MenuCard = (function(_super) {
    __extends(MenuCard, _super);

    function MenuCard() {
      _ref1 = MenuCard.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    MenuCard.prototype.parse = function() {
      var imagePath,
        _this = this;

      this.seek(1);
      this.data.image = this.readImageAsDataURI();
      this.data.name = this.readString();
      this.seek(4);
      this.data.description = this.readString();
      this.data.events = this.readArray(function() {
        return new Event(_this).parse();
      });
      this.data.flagName = this.readString();
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

}).call(this);
