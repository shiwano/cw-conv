spec = require '../spec_helper'
{expect} = require 'chai'

{Package} = spec.require "package.coffee"
spec.registerSchemas ['package', 'simple_event', 'core']

describe 'Package', ->
  describe '#parse', ->
    it 'should return the Package data', ->
      buffer = spec.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      pack.parse()
      expect(spec.validateJSON pack.data, 'package').to.be.true
