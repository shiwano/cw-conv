spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

utils = spec.require "utils.coffee"

describe 'toBase64', ->
  it 'should return the base64 string', ->
    buffer = fs.readFileSync 'test/fixture/Summary.bmp'
    base64 = utils.toBase64 buffer
    dataURI = fs.readFileSync 'test/fixture/Summary.bmp.datauri', 'ascii'
    expect(dataURI.indexOf(base64)).to.be.above -1
