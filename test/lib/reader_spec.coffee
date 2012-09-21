spec = require '../spec_helper'
should = require 'should'
require 'buffertools'
fs = require 'fs'

{Reader} = spec.require "reader.coffee"

describe 'Reader', ->
  describe '#seek', ->
    it 'should change the position of the buffer', ->
      buffer = new Buffer(10)
      reader = new Reader(buffer)
      reader.position.should.equal 0
      reader.seek 3
      reader.position.should.equal 3
      reader.seek 3, 0
      reader.position.should.equal 3

  describe '#readBoolean', ->
    it 'should return the boolean', ->
      buffer = new Buffer(4)
      [1, 0, -8].forEach (i, idx) -> buffer[idx] = i
      reader = new Reader(buffer)
      reader.readBoolean().should.be.true
      reader.readBoolean().should.be.false
      reader.readBoolean().should.be.true

  describe '#readString', ->
    it 'should return the string which is decoded from Shift-JIS', ->
      buffer = fs.readFileSync 'test/fixture/Summary.wsm'
      reader = new Reader(buffer)
      reader.readImageAsDataURI()
      reader.readString().should.equal 'ゴブリンの洞窟'

    it 'should return the empty string when the string length is 0', ->
      buffer = new Buffer(4)
      [0, 0, 0, 0].forEach (i, idx) -> buffer[idx] = i
      reader = new Reader(buffer)
      reader.readString().should.equal ''

  describe '#readInt8', ->
    it 'should return the CHAR data', ->
      buffer = new Buffer(2)
      [100, -78].forEach (i, idx) -> buffer[idx] = i
      reader = new Reader(buffer)
      reader.readInt8().should.equal 100
      reader.readInt8().should.equal -78

  describe '#readInt32', ->
    it 'should return the LONG data', ->
      buffer = new Buffer(8)
      [63, 218, 41, 54].forEach (i, idx) -> buffer[idx] = i
      [0, 163, 216, 206].forEach (i, idx) -> buffer[idx + 4] = i
      reader = new Reader(buffer)
      reader.readInt32().should.equal 908712511
      reader.readInt32().should.equal -824663296

  describe '#readImage', ->
    it 'should return the image data', ->
      buffer = fs.readFileSync 'test/fixture/Summary.wsm'
      reader = new Reader(buffer)
      imageBuf = reader.readImage()
      fixtureImageBuf = fs.readFileSync('test/fixture/Summary.bmp')
      imageBuf.equals(fixtureImageBuf).should.be.true

    it 'should return the null when image data length is 0', ->
      buffer = new Buffer(4)
      [0, 0, 0, 0].forEach (i, idx) -> buffer[idx] = i
      reader = new Reader(buffer)
      should.not.exist reader.readImage()

  describe '#readImageAsDataURI', ->
    it 'should return the dataUri string of the image data', ->
      buffer = fs.readFileSync 'test/fixture/Summary.wsm'
      reader = new Reader(buffer)
      dataURI = reader.readImageAsDataURI()
      validDataURI = fs.readFileSync 'test/fixture/Summary.bmp.datauri', 'ascii'
      dataURI.should.equal validDataURI
