define = require('amdefine')(module) if typeof window.define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'
  {createEventContent} = require './event_content'

  class Event extends Base
    parse: ->
      childrenLength          = @reader.readInt32()
      @data.children          = (createEventContent(@).parse() for i in [0...childrenLength])
      @data.triggers          = {}
      idsLength               = @reader.readInt32()
      @data.triggers.ids      = (@reader.readInt32() for i in [0...idsLength])
      keycodes                = @reader.readString()
      @data.triggers.keycodes = if keycodes then keycodes.split('\n') else []
      @data

  class SimpleEvent extends Base
    parse: ->
      childrenLength          = @reader.readInt32()
      @data.children          = (createEventContent(@).parse() for i in [0...childrenLength])
      @data

  exports.SimpleEvent = SimpleEvent
  exports.Event       = Event
  exports
