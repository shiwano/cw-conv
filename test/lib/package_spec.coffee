spec = require '../spec_helper'
{expect} = require 'chai'

{Package} = spec.require "package.coffee"
#spec.registerSchema 'info_card'

describe 'Package', ->
  describe '#parse', ->
    it 'should return the Package data', ->
      buffer = spec.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      pack.parse()
      p pack.data
      #expect(spec.validateJSON package.data, 'info_card').to.be.true
