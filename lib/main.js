(function() {
  var define;

  if (typeof window.define !== 'function') {
    define = require('amdefine')(module);
  }

  define(function(require, exports, module) {
    var Area, Battle, BeastCard, CharacterCard, InfoCard, ItemCard, Package, SkillCard, Summary, utils;
    utils = require('./utils');
    Area = require('./area').Area;
    Battle = require('./battle').Battle;
    CharacterCard = require('./character_card').CharacterCard;
    ItemCard = require('./item_card').ItemCard;
    ItemCard = require('./item_card').ItemCard;
    Package = require('./package').Package;
    InfoCard = require('./info_card').InfoCard;
    SkillCard = require('./skill_card').SkillCard;
    BeastCard = require('./beast_card').BeastCard;
    Summary = require('./summary').Summary;
    exports.convertToJSON = function(buffer, filename) {
      var type, upperCamelCasedType;
      type = utils.detectDataType(buffer, filename);
      return upperCamelCasedType = utils.toUpperCamelCase(type);
    };
    return exports;
  });

}).call(this);
