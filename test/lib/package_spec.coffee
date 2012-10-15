spec = require '../spec_helper'
{expect} = require 'chai'

{Package} = spec.require "package.coffee"
spec.registerSchema 'package'

describe 'Package', ->
  describe '#parse', ->
    it 'should return the Package data', ->
      buffer = spec.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      data = pack.parse()
      expect(spec.validateJSON data, 'package').to.be.true
