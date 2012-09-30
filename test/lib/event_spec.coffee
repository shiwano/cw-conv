spec = require '../spec_helper'
{expect} = require 'chai'

{Area} = spec.require "area.coffee"
spec.registerSchema 'event'

describe 'Event', ->
  describe '#parse', ->
    it 'should return the event data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area2.wid'
      area = new Area null, buffer
      areaData = area.parse()
      data = areaData.events[0]
      expect(spec.validateJSON data, 'event').to.be.true
