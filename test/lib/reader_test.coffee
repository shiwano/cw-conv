helper = require '../test_helper'
{expect} = require 'chai'
require 'buffertools'

{Reader} = helper.require "reader.coffee"

describe 'Reader', ->
  describe '#seek', ->
    it 'should change the position of the buffer', ->
      buffer = new ArrayBuffer(10)
      reader = new Reader(buffer)
      expect(reader).to.have.property('position').and.equal 0
      reader.seek 3
      expect(reader).to.have.property('position').and.equal 3
      reader.seek 4, 0
      expect(reader).to.have.property('position').and.equal 4

  describe '#readBoolean', ->
    it 'should return the boolean', ->
      buffer = new ArrayBuffer(4)
      [1, 0, -8].forEach (i, idx) -> buffer[idx] = i
      reader = new Reader(buffer)
      expect(reader.readBoolean()).to.be.true
      expect(reader.readBoolean()).to.be.false
      expect(reader.readBoolean()).to.be.true

  describe '#readString', ->
    it 'should return the string which is decoded from Shift-JIS', ->
      buffer = helper.readFixtureAsArrayBuffer 'Summary.wsm'
      reader = new Reader(buffer)
      reader.readImageAsDataURI()
      expect(reader.readString()).to.equal 'ゴブリンの洞窟'

    context 'when the string length is 0', ->
      it 'should return the empty string', ->
        buffer = new ArrayBuffer(4)
        [0, 0, 0, 0].forEach (i, idx) -> buffer[idx] = i
        reader = new Reader(buffer)
        expect(reader.readString()).to.equal ''

  describe '#readInt8', ->
    it 'should return the CHAR data', ->
      buffer = new ArrayBuffer(2)
      [100, -78].forEach (i, idx) -> buffer[idx] = i
      reader = new Reader(buffer)
      expect(reader.readInt8()).to.equal 100
      expect(reader.readInt8()).to.equal -78

  describe '#readInt32', ->
    it 'should return the LONG data', ->
      buffer = new ArrayBuffer(8)
      [63, 218, 41, 54].forEach (i, idx) -> buffer[idx] = i
      [0, 163, 216, 206].forEach (i, idx) -> buffer[idx + 4] = i
      reader = new Reader(buffer)
      expect(reader.readInt32()).to.equal 908712511
      expect(reader.readInt32()).to.equal -824663296

  describe '#readImage', ->
    it 'should return the image data', ->
      buffer = helper.readFixtureAsArrayBuffer 'Summary.wsm'
      reader = new Reader(buffer)
      imageBuf = reader.readImage()
      fixtureImageBuf = helper.readFixture 'Summary.bmp'
      expect(helper.toBuffer(imageBuf).equals(fixtureImageBuf)).to.be.true

    context 'when the image data length is 0', ->
      it 'should return the null', ->
        buffer = new ArrayBuffer(4)
        [0, 0, 0, 0].forEach (i, idx) -> buffer[idx] = i
        reader = new Reader(buffer)
        expect(reader.readImage()).to.be.null

  describe '#readImageAsDataURI', ->
    it 'should return the dataUri string of the image data', ->
      buffer = helper.readFixtureAsArrayBuffer 'Summary.wsm'
      reader = new Reader(buffer)
      dataURI = reader.readImageAsDataURI()
      validDataURI = helper.readFixture 'Summary.bmp.datauri', 'ascii'
      expect(dataURI).to.equal validDataURI
