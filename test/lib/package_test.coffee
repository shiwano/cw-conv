helper = require '../test_helper'
{expect} = require 'chai'

{Package} = helper.require "package.coffee"
helper.registerSchema 'package'

describe 'Package', ->
  describe '#parse', ->
    it 'should return the Package data', ->
      buffer = helper.readFixtureFile 'Package1.wid'
      pack = (new Package null, buffer)
      data = pack.parse()
      expect(helper.validateJSON data, 'package').to.be.true
