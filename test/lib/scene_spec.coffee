spec = require '../spec_helper'
{expect} = require 'chai'

{Scene} = spec.require 'scene.coffee'
spec.registerSchema 'scene'

describe 'Scene', ->
  describe '#parse', ->
    it 'should return the scene data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area1.wid'
      data = (new Scene null, buffer).parse()
      expect(spec.validateJSON data, 'scene').to.be.true

describe 'MenuCard', ->
  describe '#parse', ->
    it 'should return the menuCard data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area3.wid'
      sceneData = (new Scene null, buffer).parse()
      data = sceneData.menuCards[0]
      expect(spec.validateJSON data, 'scene#menu_card').to.be.true
