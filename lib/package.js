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
      var eventsLength, i;
      this.data.type = this.convertScenarioDataType(7);
      this.reader.seek(4);
      this.data.name = this.reader.readString();
      this.data.id = this.reader.readInt32();
      eventsLength = this.reader.readInt32();
      this.data.events = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= eventsLength ? _i < eventsLength : _i > eventsLength; i = 0 <= eventsLength ? ++_i : --_i) {
          _results.push(new SimpleEvent(this).parse());
        }
        return _results;
      }).call(this);
      return this.data;
    };

    return Package;

  })(Base);
  exports.Package = Package;
  return exports;
});