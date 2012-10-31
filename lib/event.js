(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var Base, Event, SimpleEvent, createEventContent;
    Base = require('./base').Base;
    createEventContent = require('./event_content').createEventContent;
    Event = (function(_super) {

      __extends(Event, _super);

      function Event() {
        return Event.__super__.constructor.apply(this, arguments);
      }

      Event.prototype.parse = function() {
        var childrenLength, i, idsLength, keycodes;
        childrenLength = this.reader.readInt32();
        this.data.children = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= childrenLength ? _i < childrenLength : _i > childrenLength; i = 0 <= childrenLength ? ++_i : --_i) {
            _results.push(createEventContent(this).parse());
          }
          return _results;
        }).call(this);
        this.data.triggers = {};
        idsLength = this.reader.readInt32();
        this.data.triggers.ids = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= idsLength ? _i < idsLength : _i > idsLength; i = 0 <= idsLength ? ++_i : --_i) {
            _results.push(this.reader.readInt32());
          }
          return _results;
        }).call(this);
        keycodes = this.reader.readString();
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
        var childrenLength, i;
        childrenLength = this.reader.readInt32();
        this.data.children = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= childrenLength ? _i < childrenLength : _i > childrenLength; i = 0 <= childrenLength ? ++_i : --_i) {
            _results.push(createEventContent(this).parse());
          }
          return _results;
        }).call(this);
        return this.data;
      };

      return SimpleEvent;

    })(Base);
    exports.SimpleEvent = SimpleEvent;
    exports.Event = Event;
    return exports;
  });

}).call(this);
