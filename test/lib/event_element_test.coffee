spec = require '../spec_helper'
{expect} = require 'chai'
require 'buffertools'

{createEventElement} = spec.require "event_element.coffee"
{Base} = spec.require 'base.coffee'

describe 'createEventElement', ->
  it 'should return the appropriate EventElement instance', ->
    buffer = new Buffer(100).clear()
    eventElement = createEventElement new Base(null, buffer)
    data = eventElement.parse()
    expect(data).to.have.property('type').and.equal 'start'
