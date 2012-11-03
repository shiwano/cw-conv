(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var Base, Event, SimpleEvent, createEventElement;
    Base = require('./base').Base;
    createEventElement = require('./event_element').createEventElement;
    Event = (function(_super) {

      __extends(Event, _super);

      function Event() {
        return Event.__super__.constructor.apply(this, arguments);
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
        return SimpleEvent.__super__.constructor.apply(this, arguments);
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
    return exports;
  });

}).call(this);
