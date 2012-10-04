spec = require '../spec_helper'
{expect} = require 'chai'

{ItemCard} = spec.require "item_card.coffee"
spec.registerSchemas ['item_card', 'simple_event', 'core']

describe 'ItemCard', ->
  describe '#parse', ->
    it 'should return the ItemCard data', ->
      buffer = spec.readFixtureFile 'scenario/ryune/Item68.wid'
      itemCard = new ItemCard null, buffer
      data = itemCard.parse()
      expect(spec.validateJSON data, 'item_card').to.be.true