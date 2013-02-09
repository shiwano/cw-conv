spec = require '../spec_helper'
{expect} = require 'chai'

{Package} = spec.require "package.coffee"
spec.registerSchema 'scene'

describe 'Effect', ->
  describe '#parse', ->
    it 'should return the effect data', ->
      buffer = spec.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      data = pack.parse()
      effectElements = spec.findEventElements 'effect', data.events[0]

      for effectElement in effectElements
        for effect in effectElement.effects
          expect(spec.validateJSON effect, 'scene#effect').to.be.true
