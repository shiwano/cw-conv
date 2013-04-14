helper = require '../test_helper'
{expect} = require 'chai'

{Scene} = helper.require "scene.coffee"
helper.registerSchema 'scene'

describe 'BackgroundImage', ->
  describe '#parse', ->
    it 'should return the scene data', ->
      buffer = helper.readFixtureAsArrayBuffer 'scenario/goblin_cave/Area1.wid'
      scene = new Scene null, buffer
      sceneData = scene.parse()
      data = sceneData.backgrounds[0]
      expect(helper.validateJSON data, 'scene#background_image').to.be.true
