(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var BackgroundImage, Base;
    Base = require('./base').Base;
    BackgroundImage = (function(_super) {

      __extends(BackgroundImage, _super);

      function BackgroundImage() {
        return BackgroundImage.__super__.constructor.apply(this, arguments);
      }

      BackgroundImage.prototype.parse = function() {
        this.data.left = this.reader.readInt32();
        this.data.top = this.reader.readInt32();
        this.data.width = this.reader.readInt32() % 10000;
        this.data.height = this.reader.readInt32();
        this.data.image = this.reader.readString();
        this.data.mask = this.reader.readBoolean();
        this.data.flag = this.reader.readString();
        this.reader.seek(1);
        return this.data;
      };

      return BackgroundImage;

    })(Base);
    exports.BackgroundImage = BackgroundImage;
    return exports;
  });

}).call(this);
