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
      @data.events = @readArray => new SimpleEvent(@).parse()
      @data

  exports.Package = Package
  exports
