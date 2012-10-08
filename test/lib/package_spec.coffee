spec = require '../spec_helper'
{expect} = require 'chai'

{Package} = spec.require "package.coffee"
spec.registerSchema 'core', 'background', 'event_element', 'simple_event', 'package'

describe 'Package', ->
  describe '#parse', ->
    it 'should return the Package data', ->
      buffer = spec.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      pack.parse()
      expect(spec.validateJSON pack.data, 'package').to.be.true
