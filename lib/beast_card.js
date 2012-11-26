(function() {
  var BeastCard, Card,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Card = require('./card').Card;

  BeastCard = (function(_super) {

    __extends(BeastCard, _super);

    function BeastCard() {
      return BeastCard.__super__.constructor.apply(this, arguments);
    }

    BeastCard.prototype.parse = function() {
      BeastCard.__super__.parse.apply(this, arguments);
      this.data.usageLimit = this.readInt32();
      this.data.attachment = this.isInnData ? this.readBoolean() : false;
      return this.data;
    };

    return BeastCard;

  })(Card);

  exports.BeastCard = BeastCard;

}).call(this);
