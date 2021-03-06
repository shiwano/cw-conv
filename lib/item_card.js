(function() {
  var Card, ItemCard, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Card = require('./card').Card;

  ItemCard = (function(_super) {
    __extends(ItemCard, _super);

    function ItemCard() {
      _ref = ItemCard.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ItemCard.prototype.parse = function() {
      ItemCard.__super__.parse.apply(this, arguments);
      this.data.usageLimit = this.readInt32();
      this.data.usageLimitMax = this.readInt32();
      this.data.price = this.readInt32();
      this.data.evasionBonusAlways = this.readInt32();
      this.data.resistanceBonusAlways = this.readInt32();
      this.data.defenseBonusAlways = this.readInt32();
      return this.data;
    };

    return ItemCard;

  })(Card);

  exports.ItemCard = ItemCard;

}).call(this);
