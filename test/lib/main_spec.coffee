spec = require '../spec_helper'
{expect} = require 'chai'

main = spec.require "main.coffee"
{Battle} = spec.require "battle.coffee"

describe 'main', ->
  describe '#convert', ->
    it 'should convert to JSON from old cardwird data', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Battle3.wid'
      result = main.convert buffer, 'Battle3.wid'
      result = JSON.stringify result
      expected = (new Battle null, buffer).parse()
      expected = JSON.stringify expected
      expect(result).to.be.equal expected
