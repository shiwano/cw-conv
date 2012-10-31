define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  utils           = require './utils'
  {Area}          = require './area'
  {Battle}        = require './battle'
  {CharacterCard} = require './character_card'
  {ItemCard}      = require './item_card'
  {ItemCard}      = require './item_card'
  {Package}       = require './package'
  {InfoCard}      = require './info_card'
  {SkillCard}     = require './skill_card'
  {BeastCard}     = require './beast_card'
  {Summary}       = require './summary'

  exports.convertToJSON = (buffer, filename) ->
    type = utils.detectDataType buffer, filename
    upperCamelCasedType = utils.toUpperCamelCase type


  exports
