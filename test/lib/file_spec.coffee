spec = require '../spec_helper'
require 'should'

file = spec.require "file.coffee"

describe 'file', ->
  it 'read', ->
    file.read().should.equal 'awesome'
