(function() {
  var define;

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var utils;
    exports.Area = require('./area').Area;
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
      return data.parse();
    };
    return exports;
  });

}).call(this);
