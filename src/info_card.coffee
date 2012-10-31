define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'

  class InfoCard extends Base
    parse: ->
      @data.type        = @convertScenarioDataType @reader.readInt8()
      @data.image       = @reader.readImageAsDataURI()
      @data.name        = @reader.readString()
      @data.id          = @reader.readInt32() % 10000
      @data.description = @reader.readString()
      @data

  exports.InfoCard = InfoCard
  exports
