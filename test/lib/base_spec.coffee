spec = require '../spec_helper'
require 'should'

base = spec.require "base.coffee"

describe 'base', ->
  describe 'Base', ->
    describe 'toJSON', ->
      it 'should return the JSON of the converted data', ->
        b = new base.Base null
        b.data.foo = 'foobar'
        b.data.bar = 111
        data = JSON.parse b.toJSON()
        data.foo.should.equal 'foobar'
        data.bar.should.equal 111
