define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Card} = require './card'

  class SkillCard extends Card
    parse: ->
      super
      @data.level           = @readInt32()
      @data.usageLimit      = @readInt32()
      @data

  exports.SkillCard = SkillCard
  exports
