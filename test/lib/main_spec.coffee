spec = require '../spec_helper'
{expect} = require 'chai'

main = spec.require "main.coffee"
{Battle} = spec.require "battle.coffee"

describe 'main', ->
  describe '#convert', ->
    it 'should convert to JSON from old cardwird data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Battle3.wid'
      result = main.convert buffer, 'Battle3.wid'
      expected = (new Battle null, buffer).toJSON()
      expect(result).to.be.equal expected
