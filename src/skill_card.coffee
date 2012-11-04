`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

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
