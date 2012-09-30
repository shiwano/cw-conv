if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Base, BeastCard, Effect;
  Base = require('./base').Base;
  BeastCard = require('./beast_card').BeastCard;
  Effect = (function(_super) {

    __extends(Effect, _super);

    function Effect() {
      return Effect.__super__.constructor.apply(this, arguments);
    }

    Effect.prototype.parse = function() {
      var beastsLength, categoryType, effectType, i;
      categoryType = this.reader.readInt8();
      this.reader.seek(5);
      this.data.element = this.convertEffectElementType(this.reader.readInt8());
      effectType = categoryType === 8 ? 0 : this.reader.readInt8();
      this.data.type = this.convertEffectType(categoryType, effectType);
      switch (categoryType) {
        case 0:
        case 1:
          this.data.damageType = this.convertEffectDamageType(this.reader.readInt8());
          this.data.value - this.reader.readInt32();
          break;
        case 3:
        case 4:
          this.data.duration = this.reader.readInt32();
          break;
        case 5:
          this.data.value - this.reader.readInt32();
          this.data.duration = this.reader.readInt32();
          break;
        case 8:
          beastsLength = this.reader.readInt32();
          this.data.beasts = (function() {
            var _i, _results;
            _results = [];
            for (i = _i = 0; 0 <= beastsLength ? _i < beastsLength : _i > beastsLength; i = 0 <= beastsLength ? ++_i : --_i) {
              _results.push(new BeastCard(this).parse());
            }
            return _results;
          }).call(this);
      }
      return this.data;
    };

    return Effect;

  })(Base);
  exports.Effect = Effect;
  return exports;
});