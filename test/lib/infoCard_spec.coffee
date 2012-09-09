spec = require '../spec_helper'
require 'should'
fs = require 'fs'

{InfoCard} = spec.require "infoCard.coffee"

describe 'infoCard', ->
  describe 'InfoCard', ->
    describe 'parse', ->
      it 'should return the InfoCard data', ->
        buffer = fs.readFileSync 'test/fixture/Info1.wid'
        s = new InfoCard null, buffer
        data = s.parse()
        s.type.should.equal 4
        data.name.should.equal '情報カード'
        data.id.should.equal 1
        data.description.should.match /ゆっくりしていってね！$/
