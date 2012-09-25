spec = require '../spec_helper'
{expect} = require 'chai'

{Base} = spec.require "base.coffee"

describe 'Base', ->
  describe '#toJSON', ->
    it 'should return the JSON of the converted data', ->
      base = new Base(null, new Buffer(10))
      base.data.foo = 'foobar'
      base.data.bar = 111
      data = JSON.parse base.toJSON()
      expect(data).to.have.property('foo').and.equal 'foobar'
      expect(data).to.have.property('bar').and.equal 111
