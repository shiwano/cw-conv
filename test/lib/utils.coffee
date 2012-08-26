spec = require '../spec_helper'
require 'should'

utils = spec.require "utils.coffee"

describe 'utils', ->
  describe '#toArrayBuffer', ->
    it 'should convert Buffer object to ArrayBuffer object', ->
      buf = new Buffer(10)
      buf[5] = 7
      arrayBuf = utils.toArrayBuffer buf
      arrayBuf[5].should.equal 7
      (arrayBuf instanceof ArrayBuffer).should.be.true
