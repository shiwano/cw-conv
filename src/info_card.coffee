define = @define or require('amdefine')(module)

define (require, exports, module) ->
  {Base} = require './base'

  class InfoCard extends Base
    parse: ->
      @data.type        = @convertScenarioDataType @readInt8()
      @data.image       = @readImageAsDataURI()
      @data.name        = @readString()
      @data.id          = @readInt32() % 10000
      @data.description = @readString()
      @data

  exports.InfoCard = InfoCard
  exports
