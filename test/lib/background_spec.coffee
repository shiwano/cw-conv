spec = require '../spec_helper'
{expect} = require 'chai'

{Scene} = spec.require "scene.coffee"
spec.registerSchema 'scene'

describe 'BackgroundImage', ->
  describe '#parse', ->
    it 'should return the scene data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area1.wid'
      scene = new Scene null, buffer
      sceneData = scene.parse()
      data = sceneData.backgrounds[0]
      expect(spec.validateJSON data, 'scene#background_image').to.be.true
