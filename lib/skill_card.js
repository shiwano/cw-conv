if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Card, SkillCard;
  Card = require('./card').Card;
  SkillCard = (function(_super) {

    __extends(SkillCard, _super);

    function SkillCard() {
      return SkillCard.__super__.constructor.apply(this, arguments);
    }

    SkillCard.prototype.parse = function() {
      SkillCard.__super__.parse.apply(this, arguments);
      this.data.level = this.reader.readInt32();
      this.data.usageLimit = this.reader.readInt32();
      return this.data;
    };

    return SkillCard;

  })(Card);
  exports.SkillCard = SkillCard;
  return exports;
});