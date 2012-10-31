(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var BeastCard, Card;
    Card = require('./card').Card;
    BeastCard = (function(_super) {

      __extends(BeastCard, _super);

      function BeastCard() {
        return BeastCard.__super__.constructor.apply(this, arguments);
      }

      BeastCard.prototype.parse = function() {
        BeastCard.__super__.parse.apply(this, arguments);
        this.data.usageLimit = this.reader.readInt32();
        this.data.attachment = this.isInnData ? this.reader.readBoolean() : false;
        return this.data;
      };

      return BeastCard;

    })(Card);
    exports.BeastCard = BeastCard;
    return exports;
  });

}).call(this);
