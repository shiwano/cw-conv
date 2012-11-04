if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Base, Effect;
  Base = require('./base').Base;
  Effect = (function(_super) {

    __extends(Effect, _super);

    function Effect() {
      return Effect.__super__.constructor.apply(this, arguments);
    }

    Effect.prototype.parse = function() {
      var BeastCard, categoryType, effectType,
        _this = this;
      categoryType = this.readInt8();
      this.seek(5);
      this.data.element = this.convertEffectElementType(this.readInt8());
      effectType = categoryType === 8 ? 0 : this.readInt8();
      this.data.type = this.convertEffectType(categoryType, effectType);
      switch (categoryType) {
        case 0:
        case 1:
          this.data.damageType = this.convertEffectDamageType(this.readInt8());
          this.data.value = this.readInt32();
          break;
        case 3:
        case 4:
          this.data.duration = this.readInt32();
          break;
        case 5:
          this.data.value = this.readInt32();
          this.data.duration = this.readInt32();
          break;
        case 8:
          BeastCard = require('./beast_card').BeastCard;
          this.data.beastCards = this.readArray(function() {
            return new BeastCard(_this).parse();
          });
      }
      return this.data;
    };

    return Effect;

  })(Base);
  exports.Effect = Effect;
  return exports;
});