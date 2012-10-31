define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Card} = require './card'

  class SkillCard extends Card
    parse: ->
      super
      @data.level           = @reader.readInt32()
      @data.usageLimit      = @reader.readInt32()
      @data

  exports.SkillCard = SkillCard
  exports
