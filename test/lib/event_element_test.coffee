helper = require '../test_helper'
{expect} = require 'chai'
require 'buffertools'

{createEventElement} = helper.require "event_element.coffee"
{Base} = helper.require 'base.coffee'

describe 'createEventElement', ->
  it 'should return the appropriate EventElement instance', ->
    buffer = new ArrayBuffer(100)
    eventElement = createEventElement new Base(null, buffer)
    data = eventElement.parse()
    expect(data).to.have.property('type').and.equal 'start'
