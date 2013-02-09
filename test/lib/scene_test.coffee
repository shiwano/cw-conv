helper = require '../test_helper'
{expect} = require 'chai'

{Scene} = helper.require 'scene.coffee'
helper.registerSchema 'scene'

describe 'Scene', ->
  describe '#parse', ->
    it 'should return the scene data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Area1.wid'
      data = (new Scene null, buffer).parse()
      expect(helper.validateJSON data, 'scene').to.be.true

describe 'MenuCard', ->
  describe '#parse', ->
    it 'should return the menuCard data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Area3.wid'
      sceneData = (new Scene null, buffer).parse()
      data = sceneData.menuCards[0]
      expect(helper.validateJSON data, 'scene#menu_card').to.be.true
