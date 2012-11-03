define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {SimpleEvent} = require './event'
  {Base} = require './base'

  class Package extends Base
    parse: ->
      @data.type   = @convertScenarioDataType 7
      @seek 4 # skip the unknow data
      @data.name   = @readString()
      @data.id     = @readInt32()
      eventsLength = @readInt32()
      @data.events = (new SimpleEvent(@).parse() for i in [0...eventsLength])
      @data

  exports.Package = Package
  exports
