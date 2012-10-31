spec = require '../spec_helper'
{expect} = require 'chai'

utils = spec.require "utils.coffee"

describe 'toBase64', ->
  it 'should return the base64 string', ->
    buffer = spec.readFixtureFile 'Summary.bmp'
    base64 = utils.toBase64 buffer
    dataURI = spec.readFixtureFile 'Summary.bmp.datauri', 'ascii'
    expect(dataURI.indexOf(base64)).to.be.above -1

describe 'detectDataType', ->
  it 'should return the data type name', ->
    buffer = spec.readFixtureFile 'scenario/goblin_cave/Area1.wid'
    result = utils.detectDataType buffer, 'Area1.wid'
    expect(result).to.be.equal 'scene'

    buffer = spec.readFixtureFile 'Summary.wsm'
    result = utils.detectDataType buffer, 'Summary.wsm'
    expect(result).to.be.equal 'summary'
