spec = require '../spec_helper'
{expect} = require 'chai'

{BeastCard} = spec.require "beast_card.coffee"
spec.registerSchemas ['beast_card', 'simple_event', 'core']

describe 'BeastCard', ->
  describe '#parse', ->
    it 'should return the BeastCard data', ->
      buffer = spec.readFixtureFile 'scenario/ryune/Beast91.wid'
      skillCard = new BeastCard null, buffer
      data = skillCard.parse()
      expect(spec.validateJSON data, 'beast_card').to.be.true
