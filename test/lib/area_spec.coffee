spec = require '../spec_helper'
{expect} = require 'chai'

{Area} = spec.require 'area.coffee'
spec.registerSchema 'scene', 'menu_card', 'event', 'background', 'core'

describe 'Area', ->
  describe '#parse', ->
    it 'should return the area data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area1.wid'
      data = (new Area null, buffer).parse()
      expect(spec.validateJSON data, 'scene').to.be.true

describe 'MenuCard', ->
  describe '#parse', ->
    it 'should return the menuCard data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area3.wid'
      areaData = (new Area null, buffer).parse()
      data = areaData.menuCards[0]
      expect(spec.validateJSON data, 'menu_card').to.be.true
