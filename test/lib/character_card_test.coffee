helper = require '../test_helper'
{expect} = require 'chai'

{CharacterCard} = helper.require 'character_card.coffee'
helper.registerSchema 'character_card', 'skill_card', 'item_card', 'beast_card'

describe 'CharacterCard', ->
  describe '#parse', ->
    it 'should return the character data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Mate4.wid'
      data = (new CharacterCard null, buffer).parse()
      expect(helper.validateJSON data, 'character_card').to.be.true
