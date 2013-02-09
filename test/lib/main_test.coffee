helper = require '../test_helper'
{expect} = require 'chai'

main = helper.require "main.coffee"
{Battle} = helper.require "battle.coffee"

describe 'main', ->
  describe '#convert', ->
    it 'should convert to JSON from old cardwird data', ->
      buffer = helper.readFixtureFile 'scenario/goblin_cave/Battle3.wid'
      result = main.convert buffer, 'Battle3.wid'
      data = (new Battle null, buffer)
      data.parse()
      expected = data.toJSON()
      expect(result).to.be.eql expected
