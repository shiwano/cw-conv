spec = require '../spec_helper'
{expect} = require 'chai'

{Effect} = spec.require "main.coffee"

describe 'Effect', ->
  describe '#parse', ->
    it 'should return the effect data'
