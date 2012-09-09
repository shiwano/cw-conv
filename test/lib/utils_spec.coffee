spec = require '../spec_helper'
require 'should'
fs = require 'fs'

utils = spec.require "utils.coffee"

describe 'utils', ->
  describe 'toBase64', ->
    it 'should return the base64 string', ->
      buffer = fs.readFileSync 'test/fixture/ryune_summary.bmp'
      base64 = utils.toBase64 buffer
      dataURI = fs.readFileSync 'test/fixture/ryune_summary.bmp.datauri', 'ascii'
      dataURI.indexOf(base64).should.be.above -1
