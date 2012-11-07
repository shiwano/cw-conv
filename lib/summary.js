(function() {
  var define,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define = this.define || require('amdefine')(module);

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
        this.data.type = this.convertScenarioDataType(8);
        this.data.image = this.readImageAsDataURI();
        this.data.title = this.readString();
        this.data.description = this.readString();
        this.data.author = this.readString();
        this.data.prerequisite = new Prerequisite(this).parse();
        sceneId = this.readInt32();
        this.version = ~~(sceneId / 10000);
        this.data.startSceneId = sceneId % 10000;
        this.data.defnitions = new Defnitions(this).parse();
        this.seek(4);
        this.data.recommendedLevel = {
          min: this.readInt32(),
          max: this.readInt32()
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
        var achievements;
        achievements = this.readString();
        this.data.achievements = achievements ? achievements.split('\n') : [];
        this.data.achievementsNumber = this.readInt32();
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
        var _this = this;
        this.data.stepsList = this.readArray(function() {
          return new Steps(_this).parse();
        });
        this.data.flags = this.readArray(function() {
          return new Flag(_this).parse();
        });
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
        this.data.name = this.readString();
        this.data["default"] = this.readBoolean();
        this.data.valueNameOnTrue = this.readString();
        this.data.valueNameOnFalse = this.readString();
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
        this.data.name = this.readString();
        this.data["default"] = this.readInt32();
        this.data.valueNames = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i <= 9; i = ++_i) {
            _results.push(this.readString());
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

}).call(this);
