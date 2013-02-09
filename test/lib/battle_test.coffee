helper = require '../test_helper'
{expect} = require 'chai'

{Battle} = helper.require 'battle.coffee'
helper.registerSchema 'battle'

describe 'Battle', ->
  describe '#parse', ->
    it 'should return the battle data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Battle4.wid'
      data = (new Battle null, buffer).parse()
      expect(helper.validateJSON data, 'battle').to.be.true

describe 'EnemyCard', ->
  describe '#parse', ->
    it 'should return the enemyCard data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Battle3.wid'
      battleData = (new Battle null, buffer).parse()
      data = battleData.enemyCards[0]
      expect(helper.validateJSON data, 'battle#enemy_card').to.be.true
