(function() {
  var Base, Event, SimpleEvent, createEventElement, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base').Base;

  createEventElement = require('./event_element').createEventElement;

  Event = (function(_super) {
    __extends(Event, _super);

    function Event() {
      _ref = Event.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Event.prototype.parse = function() {
      var keycodes,
        _this = this;
      this.data.children = this.readArray(function() {
        return createEventElement(_this).parse();
      });
      this.data.triggers = {};
      this.data.triggers.ids = this.readArray(function() {
        return _this.readInt32();
      });
      keycodes = this.readString();
      this.data.triggers.keycodes = keycodes ? keycodes.split('\n') : [];
      return this.data;
    };

    return Event;

  })(Base);

  SimpleEvent = (function(_super) {
    __extends(SimpleEvent, _super);

    function SimpleEvent() {
      _ref1 = SimpleEvent.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    SimpleEvent.prototype.parse = function() {
      var _this = this;
      this.data.children = this.readArray(function() {
        return createEventElement(_this).parse();
      });
      return this.data;
    };

    return SimpleEvent;

  })(Base);

  exports.SimpleEvent = SimpleEvent;

  exports.Event = Event;

}).call(this);
