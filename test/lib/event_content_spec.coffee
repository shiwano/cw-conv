spec = require '../spec_helper'
{expect} = require 'chai'
require 'buffertools'

{createEventContent} = spec.require "event_content.coffee"
{Base} = spec.require 'base.coffee'

describe 'createEventContent', ->
  it 'should return the appropriate EventContent instance', ->
    buffer = new Buffer(100).clear()
    eventContent = createEventContent new Base(null, buffer)
    data = eventContent.parse()
    expect(data).to.have.property('type').and.equal 'start'
