{Card} = require './card'

class SkillCard extends Card
  parse: ->
    super
    @data.level           = @readInt32()
    @data.usageLimit      = @readInt32()
    @data

exports.SkillCard = SkillCard
