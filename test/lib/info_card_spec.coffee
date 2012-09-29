spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{InfoCard} = spec.require "info_card.coffee"
spec.registerSchema 'info_card'

describe 'InfoCard', ->
  describe '#parse', ->
    it 'should return the InfoCard data', ->
      buffer = fs.readFileSync 'test/fixture/Info1.wid'
      infoCard = (new InfoCard null, buffer)
      infoCard.parse()
      expect(spec.validateJSON infoCard.data, 'info_card').to.be.true
