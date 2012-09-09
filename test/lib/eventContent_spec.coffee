spec = require '../spec_helper'
should = require 'should'
fs = require 'fs'
require 'buffertools'

{createEventContent} = spec.require "eventContent.coffee"
{Base} = spec.require 'base.coffee'

describe 'createEventContent', ->
  it 'should return the appropriate EventContent instance', ->
    buffer = new Buffer(100).clear()
    eventContent = createEventContent new Base(null, buffer)
    eventContent.parse().type.should.equal 'start'
