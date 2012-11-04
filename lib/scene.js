if (typeof define !== 'function') {
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
      var _this = this;
      this.data.type = this.convertScenarioDataType(this.readInt8());
      this.seek(4);
      this.data.name = this.readString();
      this.data.id = this.readInt32() % 10000;
      this.data.events = this.readArray(function() {
        return new Event(_this).parse();
      });
      this.data.cardArrangement = this.convertCardArrangementType(this.readInt8());
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
      return MenuCard.__super__.constructor.apply(this, arguments);
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