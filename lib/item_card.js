if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Card, ItemCard;
  Card = require('./card').Card;
  ItemCard = (function(_super) {

    __extends(ItemCard, _super);

    function ItemCard() {
      return ItemCard.__super__.constructor.apply(this, arguments);
    }

    ItemCard.prototype.parse = function() {
      ItemCard.__super__.parse.apply(this, arguments);
      this.data.usageLimit = this.reader.readInt32();
      this.data.usageLimitMax = this.reader.readInt32();
      this.data.price = this.reader.readInt32();
      this.data.evasionBonusAlways = this.reader.readInt32();
      this.data.resistanceBonusAlways = this.reader.readInt32();
      this.data.defenseBonusAlways = this.reader.readInt32();
      return this.data;
    };

    return ItemCard;

  })(Card);
  exports.ItemCard = ItemCard;
  return exports;
});