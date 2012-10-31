define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Card} = require './card'

  class ItemCard extends Card
    parse: ->
      super
      @data.usageLimit            = @reader.readInt32()
      @data.usageLimitMax         = @reader.readInt32()
      @data.price                 = @reader.readInt32()
      @data.evasionBonusAlways    = @reader.readInt32()
      @data.resistanceBonusAlways = @reader.readInt32()
      @data.defenseBonusAlways    = @reader.readInt32()
      @data

  exports.ItemCard = ItemCard
  exports
