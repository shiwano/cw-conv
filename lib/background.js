if (typeof define !== 'function') {
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