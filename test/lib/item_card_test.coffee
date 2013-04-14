helper = require '../test_helper'
{expect} = require 'chai'

{ItemCard} = helper.require "item_card.coffee"
helper.registerSchema 'item_card'

describe 'ItemCard', ->
  describe '#parse', ->
    it 'should return the ItemCard data', ->
      buffer = helper.readFixtureAsArrayBuffer 'scenario/ryune/Item68.wid'
      itemCard = new ItemCard null, buffer
      data = itemCard.parse()
      expect(helper.validateJSON data, 'item_card').to.be.true
