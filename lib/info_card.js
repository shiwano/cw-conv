if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Base, InfoCard;
  Base = require('./base').Base;
  InfoCard = (function(_super) {

    __extends(InfoCard, _super);

    function InfoCard() {
      return InfoCard.__super__.constructor.apply(this, arguments);
    }

    InfoCard.prototype.parse = function() {
      this.data.type = this.convertScenarioDataType(this.reader.readInt8());
      this.data.image = this.reader.readImageAsDataURI();
      this.data.name = this.reader.readString();
      this.data.id = this.reader.readInt32() % 10000;
      this.data.description = this.reader.readString();
      return this.data;
    };

    return InfoCard;

  })(Base);
  exports.InfoCard = InfoCard;
  return exports;
});