spec = require '../spec_helper'
{expect} = require 'chai'

utils = spec.require "utils.coffee"

describe 'utils', ->
  describe '#toBase64', ->
    it 'should return the base64 string', ->
      buffer = spec.readFixtureFile 'Summary.bmp'
      base64 = utils.toBase64 buffer
      dataURI = spec.readFixtureFile 'Summary.bmp.datauri', 'ascii'
      expect(dataURI.indexOf(base64)).to.be.above -1

  describe '#detectDataType', ->
    it 'should return the data type name', ->
      buffer = spec.readFixtureFile 'scenario/goblin_cave/Area1.wid'
      expect(utils.detectDataType buffer, 'Area1.wid').to.be.equal 'scene'

      buffer = spec.readFixtureFile 'Summary.wsm'
      expect(utils.detectDataType buffer, 'Summary.wsm').to.be.equal 'summary'

      buffer = spec.readFixtureFile 'Package1.wid'
      expect(utils.detectDataType buffer, 'Package1.wid').to.be.equal 'package'

      buffer = spec.readFixtureFile 'Info1.wid'
      expect(utils.detectDataType buffer, 'Info1.wid').to.be.equal 'infoCard'

  describe '#toUpperCamelCase', ->
    it 'should make a given string upperCamelCased', ->
      expect(utils.toUpperCamelCase 'finalFantasy').to.be.equal 'FinalFantasy'
      expect(utils.toUpperCamelCase 'DragonQuest').to.be.equal 'DragonQuest'
