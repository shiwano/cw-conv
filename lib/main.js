(function() {
  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(function(require, exports, module) {
    var utils, _ref;
    exports.Scene = require('./scene').Scene;
    exports.Battle = require('./battle').Battle;
    exports.CharacterCard = require('./character_card').CharacterCard;
    exports.ItemCard = require('./item_card').ItemCard;
    exports.Package = require('./package').Package;
    exports.InfoCard = require('./info_card').InfoCard;
    exports.SkillCard = require('./skill_card').SkillCard;
    exports.BeastCard = require('./beast_card').BeastCard;
    exports.Summary = require('./summary').Summary;
    utils = require('./utils');
    exports.convert = function(buffer, filename) {
      var data, type, upperCamelCasedType;
      type = utils.detectDataType(buffer, filename);
      upperCamelCasedType = utils.toUpperCamelCase(type);
      data = new exports[upperCamelCasedType](null, buffer);
      data.parse();
      return data.toJSON();
    };
    if (typeof window !== "undefined" && window !== null) {
      if ((_ref = window.Cw) == null) {
        window.Cw = {};
      }
      window.Cw.ScenarioConverter = exports;
    }
    return exports;
  });

}).call(this);
