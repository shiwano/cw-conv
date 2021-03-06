helper = require '../test_helper'
{expect} = require 'chai'

{Base} = helper.require "base.coffee"

describe 'Base', ->
  describe '#readArray', ->
    context 'length given', ->
      it 'should execute iterator each given length', ->
        buffer = new ArrayBuffer(3)
        [2, 1, 3].forEach (i, idx) -> buffer[idx] = i
        base = new Base(null, buffer)
        result = base.readArray (=> base.readInt8()), 2
        expect(result).to.be.eql [2, 1]

    context 'not length given', ->
      it 'should execute iterator each readed int32 data', ->
        buffer = new ArrayBuffer(10)
        [2, 0, 0, 0, 5, 4, 1].forEach (i, idx) -> buffer[idx] = i
        base = new Base(null, buffer)
        result = base.readArray => base.readInt8()
        expect(result).to.be.eql [5, 4]

  describe '#toJSON', ->
    it 'should return the JSON of the converted data', ->
      base = new Base(null, new ArrayBuffer(10))
      base.data.foo = 'foobar'
      base.data.bar = 111
      data = JSON.parse base.toJSON()
      expect(data).to.have.property('foo').and.equal 'foobar'
      expect(data).to.have.property('bar').and.equal 111
