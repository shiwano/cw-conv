helper = require '../test_helper'
{expect} = require 'chai'

{Package} = helper.require "package.coffee"
helper.registerSchema 'scene'

describe 'Effect', ->
  describe '#parse', ->
    it 'should return the effect data', ->
      buffer = helper.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      data = pack.parse()
      effectElements = helper.findEventElements 'effect', data.events[0]

      for effectElement in effectElements
        for effect in effectElement.effects
          expect(helper.validateJSON effect, 'scene#effect').to.be.true
