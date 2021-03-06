exports.Scene         = require('./scene').Scene
exports.Battle        = require('./battle').Battle
exports.CharacterCard = require('./character_card').CharacterCard
exports.ItemCard      = require('./item_card').ItemCard
exports.Package       = require('./package').Package
exports.InfoCard      = require('./info_card').InfoCard
exports.SkillCard     = require('./skill_card').SkillCard
exports.BeastCard     = require('./beast_card').BeastCard
exports.Summary       = require('./summary').Summary
utils                 = require './utils'

exports.convert = (buffer, filename) ->
  type = utils.detectDataType buffer, filename
  upperCamelCasedType = utils.toUpperCamelCase type
  data = new exports[upperCamelCasedType] null, buffer
  data.parse()
  data.toJSON()

if window?
  window.Cw ?= {}
  window.Cw.ScenarioConverter = exports
