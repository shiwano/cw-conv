(function() {
  var Base, Package, SimpleEvent,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

}).call(this);
