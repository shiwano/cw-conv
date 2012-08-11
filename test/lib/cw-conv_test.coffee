spec = require '../spec_helper'
require 'should'

example = spec.require "src/cw-conv.coffee"

describe 'cw-conv', ->
  it 'awesome', ->
    example.awesome().should.equal 'awesome'
