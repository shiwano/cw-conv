spec = require '../spec_helper'
{expect} = require 'chai'

{CharacterCard} = spec.require 'character_card.coffee'
spec.registerSchema 'character_card', 'skill_card', 'item_card', 'beast_card'

describe 'CharacterCard', ->
  describe '#parse', ->
    it 'should return the character data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Mate4.wid'
      data = (new CharacterCard null, buffer).parse()
      expect(spec.validateJSON data, 'character_card').to.be.true
