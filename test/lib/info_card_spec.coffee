spec = require '../spec_helper'
require 'should'
fs = require 'fs'

{InfoCard} = spec.require "info_card.coffee"

describe 'InfoCard', ->
  describe '#parse', ->
    it 'should return the InfoCard data', ->
      buffer = fs.readFileSync 'test/fixture/Info1.wid'
      data = (new InfoCard null, buffer).parse()
      data.type.should.equal 'infoCard'
      data.name.should.equal '情報カード'
      data.id.should.equal 1
      data.description.should.match /ゆっくりしていってね！$/
