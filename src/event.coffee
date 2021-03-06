{Base} = require './base'
{createEventElement} = require './event_element'

class Event extends Base
  parse: ->
    @data.children          = @readArray => createEventElement(@).parse()
    @data.triggers          = {}
    @data.triggers.ids      = @readArray => @readInt32()
    keycodes                = @readString()
    @data.triggers.keycodes = if keycodes then keycodes.split('\n') else []
    @data

class SimpleEvent extends Base
  parse: ->
    @data.children          = @readArray => createEventElement(@).parse()
    @data

exports.SimpleEvent = SimpleEvent
exports.Event       = Event
