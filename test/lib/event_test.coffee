helper = require '../test_helper'
{expect} = require 'chai'

{Scene} = helper.require "scene.coffee"
helper.registerSchema 'scene'

describe 'Event', ->
  describe '#parse', ->
    it 'should return the event data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Area2.wid'
      scene = new Scene null, buffer
      sceneData = scene.parse()
      data = sceneData.events[0]
      expect(helper.validateJSON data, 'scene#event').to.be.true
