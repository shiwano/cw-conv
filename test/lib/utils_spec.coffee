spec = require '../spec_helper'
{expect} = require 'chai'

utils = spec.require "utils.coffee"

describe 'toBase64', ->
  it 'should return the base64 string', ->
    buffer = spec.readFixtureFile 'Summary.bmp'
    base64 = utils.toBase64 buffer
    dataURI = spec.readFixtureFile 'Summary.bmp.datauri', 'ascii'
    expect(dataURI.indexOf(base64)).to.be.above -1
