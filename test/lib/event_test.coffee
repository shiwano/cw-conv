spec = require '../spec_helper'
{expect} = require 'chai'

{Scene} = spec.require "scene.coffee"
spec.registerSchema 'scene'

describe 'Event', ->
  describe '#parse', ->
    it 'should return the event data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area2.wid'
      scene = new Scene null, buffer
      sceneData = scene.parse()
      data = sceneData.events[0]
      expect(spec.validateJSON data, 'scene#event').to.be.true
