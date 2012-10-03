define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {SimpleEvent} = require './event'
  {Base} = require './base'

  class Package extends Base
    parse: ->
      @data.type   = @convertScenarioDataType 7
      @reader.seek 4 # skip the unknow data
      @data.name   = @reader.readString()
      @data.id     = @reader.readInt32()
      eventsLength = @reader.readInt32()
      @data.events = (new SimpleEvent(@).parse() for i in [0...eventsLength])
      @data

  exports.Package = Package
  exports
