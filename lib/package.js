if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Base, Package, SimpleEvent;
  SimpleEvent = require('./event').SimpleEvent;
  Base = require('./base').Base;
  Package = (function(_super) {

    __extends(Package, _super);

    function Package() {
      return Package.__super__.constructor.apply(this, arguments);
    }

    Package.prototype.parse = function() {
      var _this = this;
      this.data.type = this.convertScenarioDataType(7);
      this.seek(4);
      this.data.name = this.readString();
      this.data.id = this.readInt32();
      this.data.events = this.readArray(function() {
        return new SimpleEvent(_this).parse();
      });
      return this.data;
    };

    return Package;

  })(Base);
  exports.Package = Package;
  return exports;
});