spec = require '../spec_helper'
require 'should'
fs = require 'fs'

file = spec.require "file.coffee"

describe 'file', ->
  describe '#read', ->
    it 'should return ArrayBuffer', (done) ->
      file.read 'test/fixture/test.txt', (buf) ->
        (buf instanceof ArrayBuffer).should.be.true
        done()

    it 'should read specified file', (done) ->
      file.read 'test/fixture/test.txt', (buf) ->
        str = String.fromCharCode.apply(null, new Uint8Array(buf))
        str2 = fs.readFileSync('test/fixture/test.txt', 'utf-8')
        str.should.equal str2
        done()
