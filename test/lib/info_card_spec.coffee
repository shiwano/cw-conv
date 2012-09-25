spec = require '../spec_helper'
{expect} = require 'chai'
fs = require 'fs'

{InfoCard} = spec.require "info_card.coffee"

describe 'InfoCard', ->
  describe '#parse', ->
    it 'should return the InfoCard data', ->
      buffer = fs.readFileSync 'test/fixture/Info1.wid'
      data = (new InfoCard null, buffer).parse()
      expect(data).to.have.property('type').and.equal 'infoCard'
      expect(data).to.have.property('name').and.equal '情報カード'
      expect(data).to.have.property('id').and.equal 1
      expect(data).to.have.property('description').and.match /ゆっくりしていってね！$/
