helper = require '../test_helper'
{expect} = require 'chai'

{BeastCard} = helper.require "beast_card.coffee"
helper.registerSchema 'beast_card'

describe 'BeastCard', ->
  describe '#parse', ->
    it 'should return the BeastCard data', ->
      buffer = helper.readFixtureFile 'scenario/ryune/Beast91.wid'
      skillCard = new BeastCard null, buffer
      data = skillCard.parse()
      expect(helper.validateJSON data, 'beast_card').to.be.true
