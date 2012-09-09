spec = require '../spec_helper'
require 'should'

{Base} = spec.require "base.coffee"

describe 'base', ->
  describe 'Base', ->
    describe 'toJSON', ->
      it 'should return the JSON of the converted data', ->
        b = new Base(null, new Buffer(10))
        b.data.foo = 'foobar'
        b.data.bar = 111
        data = JSON.parse b.toJSON()
        data.foo.should.equal 'foobar'
        data.bar.should.equal 111
