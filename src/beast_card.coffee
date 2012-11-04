`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define (require, exports, module) ->
  {Card} = require './card'

  class BeastCard extends Card
    parse: ->
      super
      @data.usageLimit = @readInt32()
      @data.attachment = if @isInnData then @readBoolean() else false
      @data

  exports.BeastCard = BeastCard
  exports
