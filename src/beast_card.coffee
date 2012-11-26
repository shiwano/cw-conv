{Card} = require './card'

class BeastCard extends Card
  parse: ->
    super
    @data.usageLimit = @readInt32()
    @data.attachment = if @isInnData then @readBoolean() else false
    @data

exports.BeastCard = BeastCard
