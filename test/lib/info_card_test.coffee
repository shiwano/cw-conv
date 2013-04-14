helper = require '../test_helper'
{expect} = require 'chai'

{InfoCard} = helper.require "info_card.coffee"
helper.registerSchema 'info_card'

describe 'InfoCard', ->
  describe '#parse', ->
    it 'should return the InfoCard data', ->
      buffer = helper.readFixtureAsArrayBuffer 'Info1.wid'
      infoCard = (new InfoCard null, buffer)
      infoCard.parse()
      expect(helper.validateJSON infoCard.data, 'info_card').to.be.true
