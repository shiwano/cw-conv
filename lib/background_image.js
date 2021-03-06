(function() {
  var BackgroundImage, Base, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base').Base;

  BackgroundImage = (function(_super) {
    __extends(BackgroundImage, _super);

    function BackgroundImage() {
      _ref = BackgroundImage.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BackgroundImage.prototype.parse = function() {
      this.data.left = this.readInt32();
      this.data.top = this.readInt32();
      this.data.width = this.readInt32() % 10000;
      this.data.height = this.readInt32();
      this.data.image = this.readString();
      this.data.mask = this.readBoolean();
      this.data.flagName = this.readString();
      this.seek(1);
      return this.data;
    };

    return BackgroundImage;

  })(Base);

  exports.BackgroundImage = BackgroundImage;

}).call(this);
