define = require('amdefine')(module) if typeof window.define isnt 'function'

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
