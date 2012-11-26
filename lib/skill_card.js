(function() {
  var Card, SkillCard,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Card = require('./card').Card;

  SkillCard = (function(_super) {

    __extends(SkillCard, _super);

    function SkillCard() {
      return SkillCard.__super__.constructor.apply(this, arguments);
    }

    SkillCard.prototype.parse = function() {
      SkillCard.__super__.parse.apply(this, arguments);
      this.data.level = this.readInt32();
      this.data.usageLimit = this.readInt32();
      return this.data;
    };

    return SkillCard;

  })(Card);

  exports.SkillCard = SkillCard;

}).call(this);
