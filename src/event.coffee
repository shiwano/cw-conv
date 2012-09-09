define = require('amdefine')(module) if typeof define isnt 'function'

define (require, exports, module) ->
  {Base} = require './base'
  {createEventContent} = require './eventContent'

  class Event extends Base
    parse: ->
      childrenLength          = @reader.readInt32()
      @data.children          = (createEventContent(@).parse() for i in [0...childrenLength])
      @data.triggers          = {}
      idsLength               = @reader.readInt32()
      @data.triggers.ids      = (@reader.readInt32() for i in [0...idsLength])
      keycodesLength          = @reader.readString()
      @data.triggers.keycodes = if keycodesLength then keycodesLength.split('\n') else []
      @data

  exports.Event = Event
  exports
