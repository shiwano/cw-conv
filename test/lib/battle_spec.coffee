spec = require '../spec_helper'
{expect} = require 'chai'

{Battle} = spec.require 'battle.coffee'
spec.registerSchema 'battle'

describe 'Battle', ->
  describe '#parse', ->
    it 'should return the battle data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Battle4.wid'
      data = (new Battle null, buffer).parse()
      expect(spec.validateJSON data, 'battle').to.be.true

describe 'EnemyCard', ->
  describe '#parse', ->
    it 'should return the enemyCard data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Battle3.wid'
      battleData = (new Battle null, buffer).parse()
      data = battleData.enemyCards[0]
      expect(spec.validateJSON data, 'battle#enemy_card').to.be.true
