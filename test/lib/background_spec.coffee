spec = require '../spec_helper'
{expect} = require 'chai'

{Scene} = spec.require "scene.coffee"
spec.registerSchema 'background'

describe 'BackgroundImage', ->
  describe '#parse', ->
    it 'should return the scene data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area1.wid'
      scene = new Scene null, buffer
      sceneData = scene.parse()
      data = sceneData.backgrounds[0]
      expect(spec.validateJSON data, 'background').to.be.true
