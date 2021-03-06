helper = require '../test_helper'
{expect} = require 'chai'

utils = helper.require "utils.coffee"

describe 'utils', ->
  describe '#toBase64', ->
    it 'should return the base64 string', ->
      buffer = helper.readFixture 'Summary.bmp'
      base64 = utils.toBase64 buffer
      dataURI = helper.readFixture 'Summary.bmp.datauri', 'ascii'
      expect(dataURI.indexOf(base64)).to.be.above -1

  describe '#detectDataType', ->
    it 'should return the data type name', ->
      buffer = helper.readFixtureAsArrayBuffer 'scenario/goblin_cave/Area1.wid'
      expect(utils.detectDataType buffer, 'Area1.wid').to.be.equal 'scene'

      buffer = helper.readFixtureAsArrayBuffer 'Summary.wsm'
      expect(utils.detectDataType buffer, 'Summary.wsm').to.be.equal 'summary'

      buffer = helper.readFixtureAsArrayBuffer 'Package1.wid'
      expect(utils.detectDataType buffer, 'Package1.wid').to.be.equal 'package'

      buffer = helper.readFixtureAsArrayBuffer 'Info1.wid'
      expect(utils.detectDataType buffer, 'Info1.wid').to.be.equal 'infoCard'

  describe '#toUpperCamelCase', ->
    it 'should make a given string upperCamelCased', ->
      expect(utils.toUpperCamelCase 'finalFantasy').to.be.equal 'FinalFantasy'
      expect(utils.toUpperCamelCase 'DragonQuest').to.be.equal 'DragonQuest'
