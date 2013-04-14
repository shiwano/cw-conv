(function() {
  var Base, InfoCard, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base').Base;

  InfoCard = (function(_super) {
    __extends(InfoCard, _super);

    function InfoCard() {
      _ref = InfoCard.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    InfoCard.prototype.parse = function() {
      this.data.type = this.convertScenarioDataType(this.readInt8());
      this.data.image = this.readImageAsDataURI();
      this.data.name = this.readString();
      this.data.id = this.readInt32() % 10000;
      this.data.description = this.readString();
      return this.data;
    };

    return InfoCard;

  })(Base);

  exports.InfoCard = InfoCard;

}).call(this);
