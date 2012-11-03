(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
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
        this.data.type = this.convertScenarioDataType(this.readInt8());
        this.data.image = this.readImageAsDataURI();
        this.data.name = this.readString();
        this.data.id = this.readInt32() % 10000;
        this.data.description = this.readString();
        return this.data;
      };

      return InfoCard;

    })(Base);
    exports.InfoCard = InfoCard;
    return exports;
  });

}).call(this);
