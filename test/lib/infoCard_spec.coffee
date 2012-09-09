spec = require '../spec_helper'
require 'should'
fs = require 'fs'

{InfoCard} = spec.require "infoCard.coffee"
{Reader} = spec.require "reader.coffee"

describe 'infoCard', ->
  describe 'InfoCard', ->
    describe 'parse', ->
      it 'should return the InfoCard data', ->
        buffer = fs.readFileSync 'test/fixture/Info1.wid'
        reader = new Reader buffer
        s = new InfoCard(reader)
        data = s.parse()
        s.type.should.equal 4
        data.name.should.equal '情報カード'
        data.id.should.equal 1
        data.description.should.match /ゆっくりしていってね！$/
