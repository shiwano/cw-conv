if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(require, exports, module) {
  var Base, Defnitions, Flag, Prerequisite, Steps, Summary;
  Base = require('./base').Base;
  Summary = (function(_super) {

    __extends(Summary, _super);

    function Summary() {
      return Summary.__super__.constructor.apply(this, arguments);
    }

    Summary.prototype.parse = function() {
      var sceneId;
      this.type = -1;
      this.data.image = this.reader.readImageAsDataURI();
      this.data.title = this.reader.readString();
      this.data.description = this.reader.readString();
      this.data.author = this.reader.readString();
      this.data.prerequisite = new Prerequisite(this.reader).parse();
      sceneId = this.reader.readInt32();
      this.version = ~~(sceneId / 10000);
      this.data.startSceneId = sceneId % 10000;
      this.data.defnitions = new Defnitions(this.reader).parse();
      this.reader.seek(4);
      this.data.recommendedLevel = {
        min: this.reader.readInt32(),
        max: this.reader.readInt32()
      };
      return this.data;
    };

    return Summary;

  })(Base);
  Prerequisite = (function(_super) {

    __extends(Prerequisite, _super);

    function Prerequisite() {
      return Prerequisite.__super__.constructor.apply(this, arguments);
    }

    Prerequisite.prototype.parse = function() {
      var coupons;
      coupons = this.reader.readString();
      this.data.coupons = coupons ? coupons.split('\n') : [];
      this.data.couponsNumber = this.reader.readInt32();
      return this.data;
    };

    return Prerequisite;

  })(Base);
  Defnitions = (function(_super) {

    __extends(Defnitions, _super);

    function Defnitions() {
      return Defnitions.__super__.constructor.apply(this, arguments);
    }

    Defnitions.prototype.parse = function() {
      var flagsLength, i, stepsListLength;
      stepsListLength = this.reader.readInt32();
      this.data.stepsList = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= stepsListLength ? _i < stepsListLength : _i > stepsListLength; i = 0 <= stepsListLength ? ++_i : --_i) {
          _results.push((new Steps(this.reader)).parse());
        }
        return _results;
      }).call(this);
      flagsLength = this.reader.readInt32();
      this.data.flags = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= flagsLength ? _i < flagsLength : _i > flagsLength; i = 0 <= flagsLength ? ++_i : --_i) {
          _results.push((new Flag(this.reader)).parse());
        }
        return _results;
      }).call(this);
      return this.data;
    };

    return Defnitions;

  })(Base);
  Flag = (function(_super) {

    __extends(Flag, _super);

    function Flag() {
      return Flag.__super__.constructor.apply(this, arguments);
    }

    Flag.prototype.parse = function() {
      this.data.name = this.reader.readString();
      this.data["default"] = this.reader.readBoolean();
      this.data.valueNameOnTrue = this.reader.readString();
      this.data.valueNameOnFalse = this.reader.readString();
      return this.data;
    };

    return Flag;

  })(Base);
  Steps = (function(_super) {

    __extends(Steps, _super);

    function Steps() {
      return Steps.__super__.constructor.apply(this, arguments);
    }

    Steps.prototype.parse = function() {
      var i;
      this.data.name = this.reader.readString();
      this.data["default"] = this.reader.readInt32();
      this.data.valueNames = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i <= 9; i = ++_i) {
          _results.push(this.reader.readString());
        }
        return _results;
      }).call(this);
      return this.data;
    };

    return Steps;

  })(Base);
  exports.Summary = Summary;
  return exports;
});