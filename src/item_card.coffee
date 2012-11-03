define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Card} = require './card'

  class ItemCard extends Card
    parse: ->
      super
      @data.usageLimit            = @readInt32()
      @data.usageLimitMax         = @readInt32()
      @data.price                 = @readInt32()
      @data.evasionBonusAlways    = @readInt32()
      @data.resistanceBonusAlways = @readInt32()
      @data.defenseBonusAlways    = @readInt32()
      @data

  exports.ItemCard = ItemCard
  exports
